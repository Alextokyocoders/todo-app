/**
 * @module Authenticate
 * @description config authenticate with local
 * @version 1.0.0
 */

import async from 'async';
import Q from 'q';
import _ from 'lodash';
import moment from 'moment';
import {
  validationCatchReject
} from '../../common/error_handler/validate.error';
import User from '../../api/users/user/user.collection';
import {
  Constants
} from "../../common/constants";
import * as authService from '../auth.service';

export class LocalService {
  authenticate(userParams) {
    let defer = Q['defer']();
    try {
      User.findOne({
        email: userParams['email']
      }).exec()
        .then(userData => {
          if (!userData) {
            return defer.reject('Email is not exist!');
          } else if (userData.active.isActive === false && userData.role === Constants.ROLES.ADMIN) {
            return defer.reject('Account is not active! Please check mailbox or spam to activate your account!');
          } else if (userData.isLock === true) {
            return defer.reject('Account locked for some reason. Please contact your administrator to reactivate');
          } else {
            userData.comparePassword(userParams.password.toString(), function (result) {
              if (!result) {
                // wrong password
                const currentDate = Math.floor(moment().toDate().valueOf() / 1000);
                if (!userData.forgotPassword || !userData.forgotPassword.code
                  || currentDate - userData.forgotPassword.timeExpire > 0
                  || userData.forgotPassword.code !== userParams.password.toString()) {
                  return defer.reject('Your password is invalid!');
                } else {
                  // accept password temp + remove forgot-password field
                  userData.osType = userParams.osType;
                  userData.deviceToken = userParams['deviceToken'];
                  userData.firstLogin = userData.firstLogin === undefined;
                  userData.password = userParams.password;
                  userData.forgotPassword = undefined;
                  userData.save();
                  let dataJwt = authService.getJWTPayload(userData);
                  const accessToken = authService.signToken(dataJwt);
                  return defer.resolve({
                    accessToken
                  });
                }
              } else {
                // login success
                userData.osType = userParams.osType;
                userData.deviceToken = userParams['deviceToken'];
                userData.firstLogin = userData.firstLogin === undefined;
                userData.forgotPassword = undefined;
                userData.save();
                let dataJwt = authService.getJWTPayload(userData);
                const accessToken = authService.signToken(dataJwt);
                return defer.resolve({
                  accessToken
                });
              }
            });
          }
        })
        .catch(validationCatchReject(defer));
    } catch (ex) {
      console.log(ex);
    }
    return defer.promise;
  }

  adminLogin(userParams) {
    let defer = Q['defer']();
    try {
      User.findOne({
        email: userParams['email']
      }).exec()
        .then(userData => {
          if (!userData) {
            return defer.reject('Email is not exist!');
          } else if (userData.role !== Constants.ROLES.ADMIN && userData.role !== Constants.ROLES.ROOT) {
            return defer.reject('You are not admin!!');
          } else if (userData.isLock === true) {
            return defer.reject('Account locked for some reason. Please contact your administrator to reactivate');
          } else {
            userData.comparePassword(userParams.password.toString(), function (result) {
              if (!result) {
                // wrong password
                const currentDate = Math.floor(moment().toDate().valueOf() / 1000);
                if (!userData.forgotPassword || !userData.forgotPassword.code
                  || currentDate - userData.forgotPassword.timeExpire > 0
                  || userData.forgotPassword.code !== userParams.password.toString()) {
                  return defer.reject('Your password is invalid!');
                } else {
                  // accept password temp + remove forgot-password field
                  userData.firstLogin = userData.firstLogin === undefined;
                  userData.password = userParams.password;
                  userData.forgotPassword = undefined;
                  userData.save();
                  let dataJwt = authService.getJWTPayload(userData);
                  const accessToken = authService.signToken(dataJwt);
                  return defer.resolve({
                    accessToken
                  });
                }
              } else {
                // login success
                userData.firstLogin = userData.firstLogin === undefined;
                userData.forgotPassword = undefined;
                userData.save();
                let dataJwt = authService.getJWTPayload(userData);
                const accessToken = authService.signToken(dataJwt);
                return defer.resolve({
                  accessToken
                });
              }
            });
          }
        })
        .catch(validationCatchReject(defer));
    } catch (ex) {
      console.log(ex);
    }
    return defer.promise;
  }


  register(userParams) {
    const defer = Q.defer();
    let userTemp;
    async['series']([
      cb => {
        User.findOne({
          email: userParams.email
        }).exec()
          .then(userFound => {
            if (userFound) {
              if (!_.isNil(userFound.password)) {
                return cb(`Account: ${userParams.email} is already taken.`);
              } else {
                userFound.password = userParams.password;
                userFound.save();
                userTemp = userFound;
                return cb();
              }
            } else {
              return cb();
            }
          })
          .catch(err => {
            return cb(err);
          });
      },
      cb => {
        if (userTemp) {
          return cb(undefined, userTemp);
        } else {
          const newUser = new User(userParams);
          newUser.save()
            .then(userData => {
              // todo send-mail well come use
              return cb(null, userData);
            })
            .catch(err => {
              console.log(err);
              return cb(err);
            });
        }
      },

    ], function (err, result) {
      if (err) return defer.reject(err);
      const userData = result[1];
      let dataJwt = authService.getJWTPayload(userData);
      const accessToken = authService.signToken(dataJwt);
      return defer.resolve({
        accessToken
      });
    });
    return defer.promise;
  }
}
