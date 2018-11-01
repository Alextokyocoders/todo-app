/**
 * @author: ManhNV
 * @description: config route and middleware
 * @version 1.0.0
 */

import config from '../config/environment';
import {authService} from '../auth';
import express from "express";
import {Constants} from "../common/constants";

exports.RegisterRoutes = function (app) {
  if (config.node_env === 'development') {
    app.use(authService.acceptedAllOrigin());
  }

  // load client app
  app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(process.env['NODE_ENV'] === 'production' ? Constants.RESULT_PROD_API : Constants.RESULT_DEV_API);
  });

  //for static asset file
  app.use('/public', express.static(config.imageStore.root));

  app.use('/apidocs', express.static(config.document.docApi));
};
