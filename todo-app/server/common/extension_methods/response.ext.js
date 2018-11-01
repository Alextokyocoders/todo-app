/**
 * @author ManhNV
 * @description customer extension method response
 */

import express from 'express';
import {uploadBase} from '../../common/services/upload';

let response = express.response;

/**
 * Success
 */
response.ok = function (message, data, status = 200) {
  if ('object' === typeof message) {
    if ('number' === typeof data) {
      status = data;
    }
    data = message;
    message = 'Ok';
  } else if ('number' === typeof data) {
    status = data;
    data = null;
  }
  let objResponse = {status: status, message: message, data: data};
  if ('object' !== typeof objResponse.data) Reflect.deleteProperty(objResponse, 'data');
  this.status(status).json(objResponse);
};

/**
 * Bad Request
 */
response.bad = function (msg, error, status = 400) {
  if ('object' === typeof msg && 'undefined' === typeof error) {
    error = msg;
    msg = error.message;
    status = error.status || status;
  }
  if ([undefined, null].indexOf(error) > -1) {
    error = {};
  }
  const responseError = {
    code: error.code || null,
    status: status,
    errorMessage: msg || "Unexpected error!",
    error: process.env['NODE_ENV'] !== 'production' ? error : null
  };
  uploadBase.removeFileUpload(this.req);
  console.log(Object.keys(responseError.error).length);
  if ([undefined, null, {}].indexOf(responseError.error) === -1) {
    Reflect.deleteProperty(responseError, 'code');
  }
  if (Object.keys(responseError.error).length === 0) {
    Reflect.deleteProperty(responseError, 'error');
  }
  this.status(status).json(responseError);
};

module['exports'] = 'express.response';