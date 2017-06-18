import express from 'express';
import http from 'http';
import path from 'path';
import config from './config';

// components
import middlewareWebpackCompiler from './middleware/webpack-compiler';

/**
 * The server.
 *
 * @class Server
 */
export default class Server {

  app;
  http;
  env;

  /**
   * Bootstrap the server
   */
  static bootstrap(webpackConfig) {
    return new Server('dev', webpackConfig);
  }

  /**
   * Constructor.
   * @constructor
   */
  constructor(env, webpackConfig) {
    this.env = env;
    this.startup(webpackConfig);
  }

  async startup(webpackConfig) {

    this.app = express();
    this.http = http.Server(this.app);
    middlewareWebpackCompiler.apply(this.app, webpackConfig);
    this.config();
    this.port();

  }

  /**
   * Set up server config
   * @method config
   */
  config() {
    this.app.use((req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next();
    });

    this.app.get('*', function (req, res) {
      res.sendFile(path.resolve(process.cwd(), config.PATH_GUI, 'index.html'));
    });

    /* eslint-disable */
    this.app.use('/reports', express.static(path.resolve(process.cwd(), './reports')));
    this.app.use('/coverage', express.static(path.resolve(process.cwd(), './coverage')));
    this.app.use('/doc', express.static(path.resolve(process.cwd(), './doc')));
    this.app.use('/', express.static(path.resolve(process.cwd(), config.PATH_GUI)));
  }

  /**
   * Set server port to use
   * @method port
   */
  port() {
    this.http.listen(config.SERVER_PORT, () => {
      console.log('server ready at', config.SERVER_PORT);
    });
  }

}
