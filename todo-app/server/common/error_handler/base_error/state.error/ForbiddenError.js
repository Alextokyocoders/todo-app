'use strict';

function ForbiddenError(code = 'permission_denied', error = {message: 'User has no permission to access this resource.'}) {
  this.name = "ForbiddenError";
  this.message = error.message;
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.code = code;
  this.status = 403;
  this.inner = error;
}

ForbiddenError.prototype = Object.create(Error.prototype); // reset empty Error
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;