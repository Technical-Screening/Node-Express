import { Router } from 'express';

import auth from './auth';
import user from './user';
import city from './city';
import fuelType from './fuelType';
import vehicleType from './vehicleType';
import vehicleMake from './vehicleMake';
import vehicleOption from './vehicleOption';
import vehicleCondition from './vehicleCondition';
import VehicleDetail from './vehicleDetail';

const routes = new Router();

/**
 * Simple responser
 * @param {Request} req
 * @param {Response} res
*/
async function baseResponser(req, res) {
  res.status(200).json({ message: 'ok' });
}

routes.get('/', baseResponser);

/**
 * auth route
 */
routes.use('/auth', auth);

/**
 * user routes
 */
routes.use('/users', user);

/**
 * cities routes
 */
routes.use('/cities', city);

/**
 * fuel type routes
 */
routes.use('/fuel-types', fuelType);

/**
 * vehicle type routes
 */
routes.use('/vehicle-types', vehicleType);

/**
 * vehicle make routes
 */
routes.use('/vehicle-make', vehicleMake);

/**
 * vehicle option routes
 */
routes.use('/vehicle-options', vehicleOption);

/**
 * vehicle condition routes
 */
routes.use('/vehicle-conditions', vehicleCondition);

/**
 * vehicle details routes
 */
routes.use('/vehicle-details', VehicleDetail);

export default routes;
