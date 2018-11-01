/**
 * @module User
 * @author ManhNV
 * @description Manage user system, Grant access to user account registration
 * @version 1.0.0
 */

import Q from 'q';
import _ from 'lodash';
import async from 'async';
import moment from 'moment';
import User from './user.collection';
import {uploadBase} from '../../../common/services/upload';
import {genRandomInt} from '../../../common/services/utils';
import {Constants} from '../../../common/constants';

export class UserService {
  /**
   * @method getProfile
   * @description get user info
   * @param {String} userID
   */
  getProfile(userID) {
    const defer = Q.defer();
    try {
      User
        .findOne({
          '_id': userID
        })
        .exec()
        .then(userFound => {
          if (!userFound) {
            return defer.reject('User not found!');
          }
          const optionOmit = ['password', 'salt', 'accessToken', 'id'];
          return defer.resolve(_.omit(userFound.toJSON(), optionOmit));
        })
        .catch(err => {
          return defer.reject(err);
        });
    } catch (ex) {
      console.log(ex);
    }
    return defer.promise;
  }

  /**
   * @method update
   * @param params
   * @param userID
   */
  update(userID, params) {
    const defer = Q.defer();
    async.waterfall([
      cb => {
        User
          .findById(userID)
          .exec()
          .then(userFound => {
            if (!userFound) {
              return cb('User not found!');
            }
            return cb(undefined, userFound);
          })
          .catch(err => {
            return cb(err);
          });
      },
      (user, cb) => {
        User
          .findByIdAndUpdate(userID, {
            $set: params
          }, {
            new: true
          })
          .exec()
          .then(userUpdate => {
            // delete avatar old
            if (params.avatar && user.avatar) {
              uploadBase.deleteFile(user.avatar);
            }
            return cb(undefined, _.omit(userUpdate.toJSON(), ['password', 'salt', 'accessToken']));
          })
          .catch(err => {
            return cb(err);
          });
      }

    ], function (err, userUpdate) {
      if (err) return defer.reject(err);
      return defer.resolve(userUpdate);
    });
    return defer.promise;
  }

  /**
   * @method changePassword
   * @param userId
   * @param {Object} params
   * @param {String} params.oldPassword
   * @param {String} params.newPassword
   */
  changePassword(userId, params) {
    const defer = Q.defer();
    User
      .findById(userId)
      .exec()
      .then(userFound => {
        if (!userFound) return defer.reject('User not found.');
        userFound.comparePassword(params.oldPassword, result => {
          if (!result) return defer.reject('Password old not match.');
          userFound.password = params.newPassword;
          userFound.save()
            .then(() => {
              return defer.resolve('Change password success!');
            })
            .catch(err => {
              return defer.reject(err);
            });
        });
      })
      .catch(err => {
        return defer.reject(err);
      });

    return defer.promise;
  }

  forgotPassword(_email) {
    const defer = Q.defer();
    async['waterfall']([
      cb => {
        User
          .findOne({
            email: _email
          })
          .exec()
          .then(userFound => {
            if (!userFound) {
              return cb('Account not support in system! Please check account again.');
            }
            userFound.forgotPassword = {
              code: genRandomInt(),
              timeExpire: Math.floor(moment().add(3, 'd').toDate().valueOf() / 1000)
            };
            userFound.save()
              .then(() => {
                return cb(undefined, userFound);
              })
              .catch(err => {
                return cb(err);
              });
          })
          .catch(err => {
            return cb(err);
          });
      },
      (userData, cb) => {
        const params = {
          firstName: userData.firstName || _email,
          email: _email,
          code: userData.forgotPassword.code
        };

        // todo send mail forgot password
        return defer.resolve('Send mail active success');
      }
    ], function (err, data) {
      if (err) return defer.reject(err);
      return defer.resolve(data);
    });
    return defer.promise;
  }

  sendVerify(userId, _email) {
    const defer = Q.defer();
    const dataUpdate = {
      email: _email.toLowerCase(),
      mailActivated: {
        code: genRandomInt(),
        timeExpire: Math.floor(moment().add(3, 'd').toDate().valueOf() / 1000)
      }
    };
    User
      .findByIdAndUpdate(userId, {
        $set: dataUpdate
      }, {
        new: true
      })
      .exec()
      .then(userUpdate => {
        if (!userUpdate) return defer.reject('User not found.');
        // todo send code active email
        return defer.resolve('Send mail active success');
      })
      .catch(err => {
        return defer.reject(err);
      });
    return defer.promise;
  }

  verifyEmail(userId, _code) {
    const defer = Q.defer();
    User
      .findById(userId)
      .exec()
      .then(userFound => {
        const currentDate = Math.floor(moment().toDate().valueOf() / 1000);
        if (!userFound) {
          return defer.reject('User not found');
        } else if (!userFound.mailActivated || !userFound.mailActivated.code
          || userFound.mailActivated.code !== _code) {
          return defer.reject('Code verify invalid');
        } else if (currentDate - (userFound.mailActivated.timeExpire || 0) > 0) {
          return defer.reject('Code verify expired');
        }
        userFound.active.verifyEmail = true;
        userFound.mailActivated = undefined;
        userFound.save();
        return defer.resolve(userFound);
      })
      .catch(err => {
        return defer.reject(err);
      });
    return defer.promise;
  }

  list(query) {
    let defer = Q.defer();
    User.find(query.find)
      .sort(query.sort)
      .paginate(query.paginate)
      .then(data => defer.resolve(data))
      .catch(err => defer.reject(err));
    console.log(query.find);
    return defer.promise;
  }

  updateRole(id, role) {
    let defer = Q.defer();
    User.findByIdAndUpdate(id, {
      role: role
    }, {
      new: true
    })
      .then(data => defer.resolve(data))
      .catch(err => defer.reject(err));
    return defer.promise;
  }

  listAdmin() {
    let defer = Q.defer();
    User.find({
      $or: [
        {
          role: Constants.ROLES.ADMIN
        },
        {
          role: Constants.ROLES.ROOT
        }
      ]
    })
      .then(data => defer.resolve(data))
      .catch(err => defer.reject(err));
    return defer.promise;
  }

  lock(user, lock) {
    let defer = Q.defer();
    User.findByIdAndUpdate(user, {isLock: lock}, {new: true})
      .then(data => defer.resolve(data))
      .catch(err => defer.reject(err));
    return defer.promise;
  }
}