import { type IErrorResponse, winstonLogger, CustomError } from '@alissondavisalmeida/jobber-shared';
import { type Request, type Response, type Application, type NextFunction } from 'express';
import { type Logger } from 'winston';
import cookieSession from 'cookie-session';
import { environmentVariables } from '../config/environment-variables';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import http from 'http';
import { elasticSearch } from './elastic-search';

const log: Logger = winstonLogger(`${environmentVariables.elasticSearchUrl}`, 'apiGatewayServer', 'debug');

export class GatewayServer {
  constructor (
    private readonly application: Application
  ) { }

  start = async () => {
    this.securityMiddleware();
    this.standardMiddleware();
    this.routesMiddleware();
    await this.startElasticSearch();
    this.errorHandler();
    await this.startServer();
  };

  private readonly securityMiddleware = () => {
    this.application.set('trust proxy', 1);
    this.application.use(
      cookieSession({
        name: 'session',
        keys: [`${environmentVariables.secretKeyOne}`, `${environmentVariables.secretKeyTwo}`],
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
        secure: environmentVariables.nodeEnv !== 'development'
      })
    );
    this.application.use(hpp());
    this.application.use(helmet());
    this.application.use(cors({
      origin: environmentVariables.clientUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
  };

  private readonly standardMiddleware = () => {
    this.application.use(express.json({ limit: '200mb' }));
    this.application.use(express.urlencoded({ extended: true, limit: '200mb' }));
    this.application.use(compression());
  };

  private routesMiddleware () {

  }

  private readonly startElasticSearch = async () => {
    await elasticSearch.checkConnection();
  };

  private errorHandler () {
    this.application.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `Route not found: ${fullUrl}`);
      res.status(StatusCodes.NOT_FOUND).json({
        message: "The route you're trying to access doesn't exist."
      });
      next();
    });
    this.application.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      log.log('error', `GatewayService ${error.comingFrom}`, error);

      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
      }

      next();
    });
  }

  private readonly startServer = async () => {
    try {
      const httpServer = new http.Server(this.application);
      await this.startHttpServer(httpServer);
    } catch (error) {
      log.log('error', 'GatewayService starting server', error);
    }
  };

  private readonly startHttpServer = async (httpServer: http.Server) => {
    try {
      httpServer.listen(environmentVariables.serverPort ?? 4000, () => {
        log.info(`GatewayService running on port ${environmentVariables.serverPort}`);
      });
    } catch (error) {

    }
  };
}
