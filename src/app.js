import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
// import path from 'path';
import Youch from 'youch';

import './app/validators/ValidationError'; // registering the custom error
import routes from './routes';

/**
 * Base app - class based
*/

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  /**
  * Application middleware definition (to every request)
  */
  middlewares() {
    this.server.disable('x-powered-by');
    this.server.use(cors());
    this.server.use(express.json());
  }

  /**
  * Base route definition
  */
  routes() {
    this.server.use('/v1/api', routes);
  }

  /**
  * Default exception handler ( that method prevent the app from broke )
  */
  exceptionHandler() {
    this.server.use(async (err, req, res, _next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
