/**
 * @author: ManhNV
 * @description: config application
 * @version Beta 1
 */
'use strict';

// import core module
import express from 'express';
import http from 'http';
import StringBuilder from 'stringbuilder';
import mongoose from 'mongoose';
import Q from 'q';
// import configuration application
import config from './config/environment';

let app = express();
StringBuilder.extend('string');
mongoose.Promise = Q['Promise'];

// db connect
require('./config/database/mongo.config').connectionDb(config, mongoose).then();

import {ExpressConfig} from './config/express.config';
import {RegisterRoutes} from './routes';
import {RegisterApi} from './api';
import {Bootstrapping} from './config/bootstrap';

// register configuration
ExpressConfig(app); // config application
RegisterRoutes(app); // register router
RegisterApi(app); // register api
Bootstrapping(app); // bootstrapping app

// run app
let server = http.createServer(app);
require('./config/server.config')(server);
server.startApp();

module['exports'] = app;