import { HealthController } from '@gateway/presentation/controllers/health-controller';

export const makeHealthController = (): HealthController => {
  const healthController = new HealthController();

  return healthController;
};
