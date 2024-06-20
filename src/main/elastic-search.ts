import { winstonLogger } from '@alissondavisalmeida/jobber-shared';
import { type Logger } from 'winston';
import { environmentVariables } from '@gateway/config/environment-variables';
import { Client } from '@elastic/elasticsearch';

const log: Logger = winstonLogger(`${environmentVariables.elasticSearchUrl}`, 'apiGatewayServer', 'debug');

class ElasticSearch {
  private readonly elasticSearchClient: Client;

  constructor () {
    this.elasticSearchClient = new Client({ node: `${environmentVariables.elasticSearchUrl}` });
  }

  async checkConnection (): Promise<void> {
    let isConnected = false;

    while (!isConnected) {
      log.info('Checking ElasticSearch connection...');
      try {
        const health = await this.elasticSearchClient.cluster.health({});
        log.info(`GatewayService ElasticSearch health status ${health.status}`);
        log.info('ElasticSearch is connected');
        isConnected = true;
      } catch (error) {
        log.error('ElasticSearch is not connected, Retrying...');
        log.log('error', 'GatewayService checkConnection', error);
        throw error;
      }
    }
  }
}

export const elasticSearch = new ElasticSearch();
