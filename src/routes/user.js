import { Router } from 'express';

import StoreValidator from '../app/validators/user/StoreValidator';
import UsersController from '../app/controllers/UsersController';
import authMiddleware from '../app/middleware/auth';
import UpdateValidator from '../app/validators/user/UpdateValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes
  .route('/')
  .post([StoreValidator], UsersController.store)
  .get(UsersController.index);

routes
  .route('/:id')
  .get(UsersController.show)
  .put([UpdateValidator], UsersController.update)
  .delete(UsersController.destroy);

export default routes;
