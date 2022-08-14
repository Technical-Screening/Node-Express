import { Router } from 'express';

import StoreValidator from '../app/validators/city/StoreValidator';
import authMiddleware from '../app/middleware/auth';
import CitiesController from '../app/controllers/CitiesController';
import UpdateValidator from '../app/validators/city/UpdateValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes
  .route('/')
  .post([StoreValidator], CitiesController.store)
  .get(CitiesController.index);

routes
  .route('/:id')
  .get(CitiesController.show)
  .put([UpdateValidator], CitiesController.update)
  .delete(CitiesController.destroy);

export default routes;
