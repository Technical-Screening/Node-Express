/** @typedef {import ('express').Request} Request */
/** @typedef {import ('express').Response} Response */

import CreateUserDetailService from '../services/user/CreateUserDetailService';
import DeleteUserDetailService from '../services/user/DeleteUserDetailService';
import GetUserDetailsByIdService from '../services/user/GetUserDetailsByIdService';
import UserDetailsService from '../services/user/UserDetailsService';
import UpdateUserDetailService from '../services/user/UpdateUserDetailService';
import ControllerUtils from '../utils/ControllerUtil';

class UsersController extends ControllerUtils {
  constructor() {
    super();

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.store = this.store.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
  * List all users
  * @param {Request} req
  * @param {Response} res
  */
  async index(req, res) {
    const promise = (async () => UserDetailsService.run())();

    return this.defaultHandler(res, promise);
  }

  /**
   * Return a specific user detail
   * @param {Request} req
   * @param {Response} res
   */
  async show(req, res) {
    const data = req.params;
    const promise = (async () => GetUserDetailsByIdService.run(data.id))();
    return this.defaultHandler(res, promise);
  }

  /**
   * Insert user details
   * @param {Request} req
   * @param {Response} res
   */
  async store(req, res) {
    const promise = (async () => CreateUserDetailService.run(req.body, res))();

    return this.defaultHandler(res, promise);
  }

  /**
   * update a user details using specific id
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const promise = (async () => UpdateUserDetailService.run(id, req.body))();

    return this.defaultHandler(res, promise);
  }

  /**
   * Remove a user detail
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    const { id } = req.params;
    const promise = (async () => DeleteUserDetailService.run(id))();

    return this.defaultHandler(res, promise);
  }
}

export default new UsersController();
