/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import ControllerUtil from '../utils/ControllerUtil';
import GetVehicleOptionDetailsService
  from '../services/vehicleOption/GetVehicleOptionDetailsService';
import GetVehicleOptionByIdDetailsService
  from '../services/vehicleOption/GetVehicleOptionByIdDetailsService';
import CreateVehicleOptionDetailsService from '../services/vehicleOption/CreateVehicleOptionDetailsService';
import UpdateVehicleOptionDetailsService
  from '../services/vehicleOption/UpdateVehicleOptionDetailsService';
import DeleteVehicleOptionDetailsService
  from '../services/vehicleOption/DeleteVehicleOptionDetailsService';

class VehicleOptionsController extends ControllerUtil {
  constructor() {
    super();
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all vehicle options
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetVehicleOptionDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific vehicle option
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetVehicleOptionByIdDetailsService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create vehicle option
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateVehicleOptionDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update vehicle option using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateVehicleOptionDetailsService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a vehicle option
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteVehicleOptionDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new VehicleOptionsController();
