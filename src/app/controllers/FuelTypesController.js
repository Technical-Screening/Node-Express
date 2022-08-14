/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import CreateFuelTypeDetailsService from '../services/fuelType/CreateFuelTypeDetailsService';
import DeleteFuelTypeDetailsService from '../services/fuelType/DeleteFuelTypeDetailsService';
import GetFuelTypeDetailsByIdService from '../services/fuelType/GetFuelTypeDetailsByIdService';
import GetFuelTypeDetailsService from '../services/fuelType/GetFuelTypeDetailsService';
import UpdateFuelTypeDetailsService from '../services/fuelType/UpdateFuelTypeDetailsService';
import ControllerUtils from '../utils/ControllerUtil';

class FuelTypesController extends ControllerUtils {
  constructor() {
    super();

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all fuel types
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetFuelTypeDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific fuel type detail
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetFuelTypeDetailsByIdService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * create fuel type details
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateFuelTypeDetailsService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update a fuel type details using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateFuelTypeDetailsService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a fuel type
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteFuelTypeDetailsService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new FuelTypesController();
