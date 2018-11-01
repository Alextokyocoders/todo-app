/**
 * @author ManhNv
 * @description handler error
 * @version 1.0.0
 */

import unless from 'express-unless';
import errorHandler from 'errorhandler';
import notifier from 'node-notifier';
import errorCode from './state.error/codes.json';

/**
 * @method handlerErrorAppBase
 * @description execute error handler
 * @param app
 */
export function handlerErrorAppBase(app) {
  if (process.env['NODE_ENV'] === 'development') {
    app.use(errorHandler({log: errorNotification}));
  }

  /**
   * @method errorNotification
   * @description eslint-disable-next-line handle-callback-err
   * @param err
   * @param str
   * @param req
   */
  // eslint-disable-next-line handle-callback-err
  function errorNotification(err, str, req) {
    let title = `Error in ${req.method} ${req.url}`;
    notifier['notify']({
      title: title,
      message: str
    });
  }
}

/**
 * @method {handlerErrorApi}
 * @description handler
 * @returns errorHandle
 */
export function handlerErrorApi() {
  let errorHandle = function (error, req, res, next) {
    switch (error.name) {
    case 'UnauthorizedError':
      return res.bad('Unauthorized error', error, errorCode[error.name]);
    case 'ForbiddenError':
      return res.bad('User has no permission to access this resource.', error, errorCode[error.name]);
    default:
      return res.bad(error);
    }
  };

  errorHandle.unless = unless;
  return errorHandle;
}

/**
 * @method unauthorizedError
 * @returns unauthorizedError
 */
export function unauthorizedError() {
  let unauthorizedErrorFunc = function (error, req, res, next) {
    if (error.name === 'UnauthorizedError') {
      return res.bad('Unauthorized error', {message: "Invalid token..."}, errorCode[error.name]);
    }
  };

  unauthorizedErrorFunc.unless = unless;
  return unauthorizedErrorFunc;
}

/**
 * @method forbiddenError
 * @returns forbiddenErrorFunc
 */
export function forbiddenError() {
  let forbiddenErrorFunc = function (error, req, res, next) {
    if (error.name === 'ForbiddenError') {
      return res.bad('User has no permission to access this resource.', error, errorCode[error.name]);
    }
  };

  forbiddenErrorFunc.unless = unless;
  return forbiddenErrorFunc;
}