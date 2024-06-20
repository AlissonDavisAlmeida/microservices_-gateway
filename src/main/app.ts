import express from 'express';
import { GatewayServer } from './server';
import { makeHealthRoute } from './factories/health-routes-factories';

export class Application {
  initialize = async () => {
    const application = express();
    const healthRouter = makeHealthRoute();
    application.use('', healthRouter.routes());
    const server = new GatewayServer(application);

    await server.start();
  };
}

const application = new Application();

application.initialize()
  .then(() => {
    console.log('Application initialized');
  }).catch((error) => {
    console.error('Error initializing application', error);
  });
