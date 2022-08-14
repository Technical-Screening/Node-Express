import { Router } from 'express';
import FuelTypesController from '../app/controllers/FuelTypesController';

import authMiddleware from '../app/middleware/auth';
import UpdateValidator from '../app/validators/city/UpdateValidator';
import StoreValidator from '../app/validators/fuelType/StoreValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], FuelTypesController.store).get(FuelTypesController.index);

routes.route('/:id').get(FuelTypesController.show).put([UpdateValidator], FuelTypesController.update).delete(FuelTypesController.destroy);

export default routes;
