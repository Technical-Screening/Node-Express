import { Router } from 'express';
import VehicleTypeController from '../app/controllers/VehicleTypeController';

import authMiddleware from '../app/middleware/auth';
import UpdateValidator from '../app/validators/vehicleType/UpdateValidator';
import StoreValidator from '../app/validators/vehicleType/StoreValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], VehicleTypeController.store).get(VehicleTypeController.index);

routes.route('/:id').get(VehicleTypeController.show).put([UpdateValidator], VehicleTypeController.update).delete(VehicleTypeController.destroy);

export default routes;
