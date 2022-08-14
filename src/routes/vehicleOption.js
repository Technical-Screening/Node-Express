import { Router } from 'express';
import VehicleOptionsController from '../app/controllers/VehicleOptionsController';

import authMiddleware from '../app/middleware/auth';
import StoreValidator from '../app/validators/vehicleOption/StoreValidator';
import UpdateValidator from '../app/validators/vehicleOption/UpdateValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], VehicleOptionsController.store).get(VehicleOptionsController.index);

routes.route('/:id').get(VehicleOptionsController.show).put([UpdateValidator], VehicleOptionsController.update).delete(VehicleOptionsController.destroy);

export default routes;
