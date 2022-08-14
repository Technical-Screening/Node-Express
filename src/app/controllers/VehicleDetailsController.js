/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import ControllerUtils from '../utils/ControllerUtil';
import GetVehicleDetailsService from '../services/vehicleDetails/GetVehicleDetailsService';
import GetVehicleDetailsByIdService from '../services/vehicleDetails/GetVehicleDetailsByIdService';
import CreateVehicleDetailsService from '../services/vehicleDetails/CreateVehicleDetailsService';
import UpdateVehicleDetailsService from '../services/vehicleDetails/UpdateVehicleDetailsService';
import DeleteVehicleDetailsService from '../services/vehicleDetails/DeleteVehicleDetailsService';

class VehicleDetailsController extends ControllerUtils {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all vehicle details
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetVehicleDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific vehicle details
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetVehicleDetailsByIdService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle details
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateVehicleDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update vehicle details
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateVehicleDetailsService.run(id, res.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a vehicle details
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteVehicleDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new VehicleDetailsController();
