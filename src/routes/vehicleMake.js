import { Router } from 'express';
import VehicleMakeController from '../app/controllers/vehicleMakeController';

import authMiddleware from '../app/middleware/auth';
import UpdateValidator from '../app/validators/vehicleMake/UpdateValidator';
import StoreValidator from '../app/validators/vehicleMake/StoreValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], VehicleMakeController.store).get(VehicleMakeController.index);

routes.route('/:id').get(VehicleMakeController.show).put([UpdateValidator], VehicleMakeController.update).delete(VehicleMakeController.destroy);

export default routes;
