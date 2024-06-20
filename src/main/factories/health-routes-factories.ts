import { HealthRoutes } from '../routes/health.route';
import { makeHealthController } from './health-controller-factories';

export const makeHealthRoute = (): HealthRoutes => {
  const controller = makeHealthController();
  const healthRoutes = new HealthRoutes(controller);

  return healthRoutes;
};
