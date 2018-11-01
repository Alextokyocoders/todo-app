/**
 * @author: ManhNV
 * @date:   2016-12-13T13:38:58+07:00
 * @description custom function error message
 */

import _ from 'lodash';

export function validationParamError(res, errors, statusCode = 400) {
  return res.bad(_.values(errors)[0].msg, errors, statusCode);
}

/**
 * @method {ValidationError}
 * @description: use catch scope validation catch in recruiterController
 * @param res
 * @param statusCode
 * @returns {Function}
 * @constructor
 */
export function validationCatch(res, statusCode = 400) {
  //err in catch
  return function (err) {
    return res.bad(err);
  };
}

/**
 * @method {validationCatchReject}
 * @description: support function error in catch service
 * @param deferred
 * @returns {Function}
 */
export function validationCatchReject(deferred) {
  return function (err) {
    return deferred.reject(`${err.name}: ${err.message}`);
  };
}