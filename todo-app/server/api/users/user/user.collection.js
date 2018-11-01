"use strict";
/* eslint-disable no-invalid-this */
/**
 * @class User
 * @classdesc Store user info register system
 * @author ManhNV
 * @alias administrator
 * @property {string} firstName - first name register
 * @property {string} lastName  -last name register
 * @property {string} email -Email register
 * @property {string} password  -Password authenticate account
 * @property {string} avatar -string key file avatar
 * @property {string} phone -Phone number registered user
 * @property {string} provider -provider default is normal, or authenticate with network social
 * @property {string} role  -admin | user
 * @property {boolean} isActive -true <=> active account, false <=> not active
 * @property {boolean} isResetPassword -if true => pending reset password, else => account not reset
 * @property {boolean} isLock => true <=> lock account else unlock account
 * @version 1.0.0
 */

import mongoose, {Schema} from 'mongoose';
import async from 'async';
import _ from 'lodash';
import config from '../../../config/environment';
import {authService} from '../../../auth';
import {Constants, PatternConfig} from '../../../common/constants';
import {genRandomInt} from '../../../common/services/utils';

let UserSchema = new Schema({
  avatar: {
    type: String,
    optional: true,
  },
  firstName: String,
  lastName: String,
  middleInitial: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  phone: String,
  SMScode: {
    type: String,
    default: genRandomInt()
  },
  ssn: String,
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required() {
      const user = Object.values(Constants.AUTH_TYPES).slice(0, 2);
      // google, uber is require (lyft not access email, facebook? email, )
      return user.indexOf(this.provider) !== -1;
    }
  },
  password: {
    type: String,
    required() {
      return _.values(Constants.AUTH_TYPES).slice(0, 4)
        .indexOf(this.provider) === -1;
    }
  },
  role: {
    type: String,
    required: true,
    enum: _.values(Constants.ROLES),
    default: Constants.ROLES.DRIVER // default driver
  },
  provider: {
    type: String,
    required: true,
    enum: _.values(Constants.AUTH_TYPES),
    default: Constants.AUTH_TYPES.LOCAL
  },
  salt: {
    type: String,
    optional: true, // require vs register normal (not using internet network)
    default: authService.genRandomString(32)
  },
  active: {
    profile: {
      type: Boolean,
      default: false
    },
    taxProfile: {
      type: Boolean,
      default: false
    },
    verifyEmail: {
      type: Boolean,
      default: false
    },
    linkAccount: {
      type: Boolean,
      default: false
    },
    verifySMS: {
      type: Boolean,
      default: false
    }
  },
  forgotPassword: {
    code: String,
    timeExpire: Number
  },
  mailActivated: {
    code: String,
    timeExpire: Number
  },
  isLock: {
    type: Boolean,
    default: false
  },
  receiveNotify: {
    type: Boolean,
    required() {
      return this.role !== Constants.ROLES.ADMIN;
    },
    default: true
  },
  firstLogin: {
    type: Boolean
  },
  timeLogin: {
    type: Date,
    default: Date.now
  },
  deviceToken: String,
  osType: {
    type: String,
    enum: ['android', 'ios', 'web']
  },
  customerId: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

UserSchema
  .virtual('pathImage')
  .get(function () {
    return `${config.imageStore.host}:${config.node_env === 'local' ? `:${config.port}` : ''}${config.imageStore.baseDir}/`;
  });

const authValid = _.values(Constants.AUTH_TYPES).slice(0, 4);
/**
 * Validation
 */
// validate password
UserSchema
  .path('password')
  .validate(function (password) {
    return authValid.indexOf(this.provider) !== -1 ? true
      : password.trim().length >= 6;
  }, 'Password must be 6 characters long!');
// validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
    return authValid.indexOf(this.provider) !== -1 ? true : email.length;
  }, 'Email cannot be empty!');
UserSchema
  .path('phone')
  .validate(function (phone) {
    return PatternConfig.patternPhone.test(phone);
  }, 'Phone invalid!');

// pre hook =================================================
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    this.password = authService.sha512(this.password, this.salt);
    return next();
  }
});
// method =============================================================
UserSchema.methods.comparePassword = function (password, cb) {
  return cb(authService.sha512(password, this.salt) === this.password);
};

export default mongoose.model('User', UserSchema);