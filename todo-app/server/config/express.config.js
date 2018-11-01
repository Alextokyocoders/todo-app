/**
 * @author ManhNV
 * @description config express application
 * @version 1.0
 */
'use strict';

require('rootpath')();
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import config from './environment/index';
import morgan from 'morgan';
import {handlerErrorAppBase} from '../common/error_handler/base_error';
import {customExpressValidation} from '../common/error_handler/validation.error';

exports.ExpressConfig = function (app) {
  //set log in environment develop
  if (config.node_env !== 'production') {
    app.use(morgan('dev'));
  }

  //Init data in environment production
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, '../views'));

  app.use(helmet());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(favicon(path.join(config.serverPath, 'public/images/easy_push.ico')));
  app.use(expressValidator({
    customValidators: customExpressValidation
  }));

  setImmediate(() => {
    handlerErrorAppBase(app);
  });
};