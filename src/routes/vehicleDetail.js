import { Router } from 'express';
import VehicleDetailsController from '../app/controllers/VehicleDetailsController';

import authMiddleware from '../app/middleware/auth';
import StoreValidator from '../app/validators/vehicleDetail/StoreValidator';
import UpdateValidator from '../app/validators/vehicleDetail/UpdateValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], VehicleDetailsController.store).get(VehicleDetailsController.index);

routes.route('/:id').get(VehicleDetailsController.show).put([UpdateValidator], VehicleDetailsController.update).delete(VehicleDetailsController.destroy);

export default routes;
