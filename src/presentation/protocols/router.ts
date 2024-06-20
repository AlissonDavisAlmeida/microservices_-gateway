import { type Router } from 'express';

export interface Route {
  routes: () => Router
}
