import { type Controller } from '@gateway/presentation/protocols/controller';
import { type Route } from '@gateway/presentation/protocols/router';
import { Router } from 'express';

export class HealthRoutes implements Route {
  private readonly route: Router;

  constructor (
    private readonly controller: Controller
  ) {
    this.route = Router();
  }

  routes = () => {
    const route = this.route.get('/gateway-health', this.controller.handle);
    console.log('Health route loaded');
    return route;
  };
}
