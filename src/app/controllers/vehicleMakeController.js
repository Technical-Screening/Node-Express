/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import ControllerUtil from '../utils/ControllerUtil';
import GetVehicleMakeDetailsService from '../services/vehicleMake/GetVehicleMakeDetailsService';
import GetVehicleMakeDetailsByIdDetailsService
  from '../services/vehicleMake/GetVehicleMakeDetailsByIdDetailsService';
import CreateVehicleMakeDetailsService
  from '../services/vehicleMake/CreateVehicleMakeDetailsService';
import UpdateVehicleMakeDetailsService
  from '../services/vehicleMake/UpdateVehicleMakeDetailsService';
import DeleteVehicleMakeDetailsService
  from '../services/vehicleMake/DeleteVehicleMakeDetailsService';

class VehicleMakeController extends ControllerUtil {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all vehicle make
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetVehicleMakeDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle make
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetVehicleMakeDetailsByIdDetailsService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle make
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateVehicleMakeDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update vehicle make using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateVehicleMakeDetailsService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a vehicle make
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteVehicleMakeDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new VehicleMakeController();
