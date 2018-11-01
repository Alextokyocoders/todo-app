/* eslint-disable no-return-assign */
/**
 * @author ManhNV
 * @description config api
 * @version 1.0
 */


import express from 'express';
import _ from 'lodash';
import config from '../config/environment';
import { handlerErrorApi } from '../common/error_handler/base_error';
import authRouter, { expressJwtAuth, authService as auth } from '../auth';
import apiIgnore from './common/api-ignore';
import { useWithUrl } from '../auth/expressJwt.service';
import { mapAdminApi } from '../auth/auth.service';

const router = express.Router();
// accept basic authenticate with vs unless exception api

exports.RegisterApi = function (app) {
  // ******* register authentication with secret
  const ignoreProtectedApi = _.uniqBy(_.values(apiIgnore.auth)
    .reduce((value, item) => value.concat(item), []));
  const adminApi = mapAdminApi(apiIgnore["admin-api"]);

  app.use('/api', expressJwtAuth({ secret: config.jwt_secret, role: ['admin', 'driver', 'super admin'] })
    .unless({
      path: [
        ...auth.mapUnlessApi(ignoreProtectedApi),
        { url: auth.mapUnlessApiUsingRegex(apiIgnore.regex), method: ['GET'] },
        ...adminApi
      ]
    }));

  app.use('/api', useWithUrl(adminApi, expressJwtAuth({ secret: config.jwt_secret, role: ['admin', 'super admin'] })));

  app.use(handlerErrorApi());

  // ******* register api
  router.use('/common', require('./common')['default']);
  router.use('/auth', authRouter);
  router.use('/user', require('./users/user')['default']);

  app.use(`/api/${config.apiVersion}`, router);
};

