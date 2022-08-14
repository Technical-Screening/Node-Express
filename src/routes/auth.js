import { Router } from 'express';

import LogInController from '../app/controllers/LogInController';
import LoginValidator from '../app/validators/auth/LoginValidator';

const routes = new Router();

routes
  .route('/login')
  .post([LoginValidator], LogInController.login);

export default routes;
