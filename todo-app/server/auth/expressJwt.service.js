/* eslint-disable prefer-reflect */
/**
 * @author express
 * @modified ManhNV
 * @description custom expressJwt, add auth with role admin
 * @version expressJwt- 5.3.0
 */

import jwt from 'jsonwebtoken';
import UnauthorizedError from '../common/error_handler/base_error/state.error/UnauthorizedError';
import ForbiddenError from '../common/error_handler/base_error/state.error/ForbiddenError';
import unless from 'express-unless';
import async from 'async';
import set from 'lodash.set';
import {Constants} from "../common/constants";
import * as URL from 'url';

let DEFAULT_REVOKED_FUNCTION = function (_, __, cb) {
  return cb(null, false);
};

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

function wrapStaticSecretInCallback(secret) {
  return function (_, __, cb) {
    return cb(null, secret);
  };
}

/**
 * @function
 * @description config authenticate with
 * @param options
 * @returns {middleware}
 */
export function expressJwtMiddleware(options) {
  const roleAccept = options['role'] || [Constants.ROLES.NORMAL];
  if (!options || !options.secret) throw new Error('secret should be set');

  let secretCallback = options.secret;
  if (!isFunction(secretCallback)) {
    secretCallback = wrapStaticSecretInCallback(secretCallback);
  }

  let isRevokedCallback = options['isRevoked'] || DEFAULT_REVOKED_FUNCTION;

  let _requestProperty = options['userProperty'] || options['requestProperty'] || 'user';
  let _resultProperty = options['resultProperty'];
  let credentialsRequired = typeof options['credentialsRequired'] === 'undefined'
    ? true : options['credentialsRequired'];

  let middleware = function (req, res, next) {
    let token;

    if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
      let hasAuthInAccessControl = !!~req.headers['access-control-request-headers']
        .split(',').map(function (header) {
          return header.trim();
        }).indexOf('authorization');

      if (hasAuthInAccessControl) {
        return next();
      }
    }

    if (options['getToken'] && typeof options['getToken'] === 'function') {
      try {
        token = options['getToken'](req);
      } catch (e) {
        return next(e);
      }
    } else if (req.headers && req.headers.authorization) {
      let parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        let scheme = parts[0];
        let credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else if (credentialsRequired) {
          return next(new UnauthorizedError('credentials_bad_scheme',
            {message: 'Format is Authorization: Bearer [token]'}));
        } else {
          return next();
        }
      } else {
        return next(new UnauthorizedError('credentials_bad_format',
          {message: 'Format is Authorization: Bearer [token]'}));
      }
    }

    if (!token) {
      if (credentialsRequired) {
        return next(new UnauthorizedError('credentials_required',
          {message: 'No authorization token was found'}));
      } else {
        return next();
      }
    }

    let dtoken;

    try {
      dtoken = jwt.decode(token, {complete: true}) || {};
    } catch (err) {
      return next(new UnauthorizedError('invalid_token', err));
    }

    async['waterfall']([
      function (callback) { // getSecret
        let arity = secretCallback.length;
        if (arity === 4) {
          secretCallback(req, dtoken.header, dtoken.payload, callback);
        } else { // arity == 3
          secretCallback(req, dtoken.payload, callback);
        }
      },
      function (secret, callback) { // verifyToken
        jwt.verify(token, secret, options, function (err, decoded) {
          return err ? callback(new UnauthorizedError('invalid_token', err)) : callback(null, decoded);
        });
      },
      function (decoded, callback) { // checkRevoked
        isRevokedCallback(req, dtoken.payload, function (err, revoked) {
          if (err) {
            return callback(err);
          } else if (revoked) {
            return callback(new UnauthorizedError('revoked_token', {message: 'The token has been revoked.'}));
          } else if (decoded.role === Constants.ROLES.ADMIN) {
            return callback(null, decoded);
          } else if (roleAccept.indexOf(decoded.role) === -1) {
            return callback(new ForbiddenError('permission_denied',
              {message: 'User has no permission to access this resource.'}));
          } else {
            return callback(null, decoded);
          }
        });
      }

    ], function (err, result) {
      if (err) {
        return next(err);
      }
      if (_resultProperty) {
        set(res, _resultProperty, result);
      } else {
        set(req, _requestProperty, result);
      }
      next();
    });
  };

  middleware.unless = unless;
  middleware.UnauthorizedError = UnauthorizedError;
  middleware.ForbiddenError = ForbiddenError;

  return middleware;
}


export function useWithUrl(URLList, middleware) {
  function isUrlMatch(p, url) {
    if (p && p.url) {
      return isUrlMatch(p.url, url);
    }
    return typeof p === 'string' && p === url || p instanceof RegExp && !!p.exec(url);
  }

  return function (req, res, next) {
    const list = URLList;
    let path = URL.parse(req.originalUrl || '', true).pathname;

    const method = req.method.toUpperCase();
    const result = list.some(c => {
      if (c.method && !Array.isArray(c.method)) {
        c.method = [c.method];
      }
      return isUrlMatch(c, path) && (c.method ? c.method.indexOf(method) > -1 : true);
    });
    return result ? middleware(req, res, next) : next();
  };
}
