/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import ControllerUtils from '../utils/ControllerUtil';
import GetVehicleTypeDetailsService from '../services/vehicleType/GetVehicleTypeDetailsService';
import GetVehicleTypeDetailsByIdService from '../services/vehicleType/GetVehicleTypeDetailsByIdService';
import CreateVehicleTypeDetailsService from '../services/vehicleType/CreateVehicleTyeDetailsService';
import UpdateVehicleTypeDetailsService from '../services/vehicleType/UpdateVehicleTypeDetailsService';
import DeleteVehicleTypeDetailsService from '../services/vehicleType/DeleteVehicleTypeDetailsService';

class VehicleTypeController extends ControllerUtils {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all vehicle type
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetVehicleTypeDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific vehicle type
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetVehicleTypeDetailsByIdService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle type
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateVehicleTypeDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update vehicle type using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateVehicleTypeDetailsService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a vehicle type
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteVehicleTypeDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new VehicleTypeController();
