/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import ControllerUtils from '../utils/ControllerUtil';
import GetVehicleConditionDetailsService
  from '../services/vehicleCondition/GetVehicleConditionDetailsService';
import GetVehicleConditionByIdDetailsService
  from '../services/vehicleCondition/GetVehicleConditionByIdDetailsService';
import CreateVehicleConditionDetailsService
  from '../services/vehicleCondition/CreateVehicleConditionDetailsService';
import UpdateVehicleConditionDetailsService
  from '../services/vehicleCondition/UpdateVehicleConditionDetailsService';
import DeleteVehicleConditionDetailsService
  from '../services/vehicleCondition/DeleteVehicleConditionDetailsService';

class VehicleConditionController extends ControllerUtils {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all vehicle conditions
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetVehicleConditionDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific vehicle condition
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetVehicleConditionByIdDetailsService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle condition
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateVehicleConditionDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update vehicle condition using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateVehicleConditionDetailsService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a vehicle condition
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteVehicleConditionDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new VehicleConditionController();
