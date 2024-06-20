import { type Controller } from '@gateway/presentation/protocols/controller';

export class HealthController implements Controller {
  handle = async (request: any, response: any) => {
    response.status(200).json({ message: 'API Gateway Server is up and running' });
  };
}
