/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import GetCityDetailsByIdService from '../services/city/GetCityDetailsByIdService';
import GetCityDetailsService from '../services/city/GetCityDetailsService';
import CreateCityDetailService from '../services/city/CreateCityDetailService';
import UpdateCityDetailService from '../services/city/UpdateCityDetailService';
import DeleteCityDetailService from '../services/city/DeleteCityDetailService';
import ControllerUtils from '../utils/ControllerUtil';

class CitiesController extends ControllerUtils {
  constructor() {
    super();

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * List all cities
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const promise = (async () => GetCityDetailsService.run())();
    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific city detail
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetCityDetailsByIdService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Insert city details
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateCityDetailService.run(req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * update a city details using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateCityDetailService.run(id, req.body))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a city detail
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteCityDetailService.run(id))();
    return this.defaultHandler(res, promise);
  }
}

export default new CitiesController();
