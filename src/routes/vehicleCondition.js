import { Router } from 'express';
import VehicleConditionController from '../app/controllers/VehicleConditionController';

import authMiddleware from '../app/middleware/auth';
import StoreValidator from '../app/validators/vehicleCondition/StoreValidator';
import UpdateValidator from '../app/validators/vehicleCondition/UpdateValidator';

const routes = new Router();

routes.use(authMiddleware.veriftToken);

routes.route('/').post([StoreValidator], VehicleConditionController.store).get(VehicleConditionController.index);

routes.route('/:id').get(VehicleConditionController.show).put([UpdateValidator], VehicleConditionController.update).delete(VehicleConditionController.destroy);

export default routes;
