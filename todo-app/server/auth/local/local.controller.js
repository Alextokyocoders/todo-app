/* eslint-disable max-len */
/**
 * @author ManhNV
 * @description authenticate local controller
 * @version 1.0
 */

import _ from 'lodash';
import { validationParamError } from '../../common/error_handler/validate.error';
import { LocalService } from './local.service';

let localService = new LocalService();

export class LocalController {
  constructor(_localService) {
    localService = _localService || new LocalService();
  }

  /**
   *
   * @api {POST} /auth/login 1. Local Login
   * @apiName local-login
   * @apiGroup Authenticate
   * @apiDescription authenticate with local
   * @apiVersion  1.0.0
   *
   * @apiParam (Body) {String} email email register
   * @apiParam (Body) {String} password password register
   * @apiParam (Body) {String} osType osType is <code>android</code>, <code>ios</code> or <code>web</code>
   * @apiParam (Body) {String} [deviceToken] registrationId require when osType is <code>android</code> or <code>ios</code>
   *
   * @apiParamExample  {JSON} Request-Example:
   {
       "email": "nguyenmanhit.mak2@gmail.com",
       "password": "123456",
       "osType": "web"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
       "status": 200,
       "message": "Ok",
       "data": {
           "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTk4ZDE1ZTRkYjhkZTBlZmQzYjUxMDgiLCJyb2xlIjoiZHJpdmVyIiwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiIiwicGF0aEltYWdlIjoiaHR0cDovLzUyLjc3LjI0NS4xOTU6ODg4OC9wdWJsaWMvIiwiaWF0IjoxNTIwMjEzNDE3LCJleHAiOjE1MjI4MDU0MTd9.vN62mpbeyAgdqvNlLyiBR4ojen_6YNP3hQsTpnmI_vg"
       }
   }
   *
   */
  authenticate(req, res) {
    req.check('email', 'Email cannot be empty!').notEmpty();
    req.check('password', 'Password cannot be empty!').notEmpty();
    req.check('osType', 'Missing os type!').isIn(['ios', 'android', 'web']);
    if (req.body.osType !== 'web') {
      if (req.body.osType === 'ios') {
        req.check('deviceToken', 'Device token invalid!').isLength({
          min: 64,
          max: 64
        });
      } else {
        req.check('deviceToken', 'Device token invalid!').isLength({
          min: 64,
          max: 256
        });
      }
    }
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    localService.authenticate(req.body)
      .then(adminData => res.ok(adminData))
      .catch(error => {
        return res.bad(error);
      });
  }


  /**
   *
   * @api {POST} /auth/admin/login 3. Admin Login
   * @apiName admin-login
   * @apiGroup Authenticate
   * @apiDescription Admin authenticate
   * @apiVersion  1.0.0
   *
   * @apiParam (Body) {String} email email register
   * @apiParam (Body) {String} password password register
   *
   * @apiParamExample  {JSON} Request-Example:
   {
       "email": "hoangkimson10c2@gmail.com",
       "password": "123456",
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
       "status": 200,
       "message": "Ok",
       "data": {
           "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTk4ZDE1ZTRkYjhkZTBlZmQzYjUxMDgiLCJyb2xlIjoiZHJpdmVyIiwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiIiwicGF0aEltYWdlIjoiaHR0cDovLzUyLjc3LjI0NS4xOTU6ODg4OC9wdWJsaWMvIiwiaWF0IjoxNTIwMjEzNDE3LCJleHAiOjE1MjI4MDU0MTd9.vN62mpbeyAgdqvNlLyiBR4ojen_6YNP3hQsTpnmI_vg"
       }
   }
   *
   */
  adminLogin(req, res) {
    req.check('email', 'Email cannot be empty!').notEmpty();
    req.check('password', 'Password cannot be empty!').notEmpty();

    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }

    localService.adminLogin(req.body)
      .then(data => res.ok(data))
      .catch(error => {
        return res.bad(error);
      });
  }

  /**
   *
   * @api {POST} /auth/register 2. Local Register
   * @apiName local-register
   * @apiGroup Authenticate
   * @apiDescription register with local
   * @apiVersion  1.0.0
   *
   * @apiParam (Body) {String} email email register
   * @apiParam (Body) {String} password password register
   * @apiParam (Body) {String} phone phone number
   * @apiParam (Body) {String} osType osType is <code>android</code>, <code>ios</code> or <code>web</code>
   * @apiParam (Body) {String} [deviceToken] registrationId require when osType is <code>android</code> or <code>ios</code>
   *
   * @apiParamExample  {JSON} Request-Example:
   {
       "email": "nguyenmanhit.mak1@gmail.com",
       "fullName": "Nguyen Van Manh",
       "password":"123456",
       "osType": "web"
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
   {
       "status": 200,
       "message": "Ok",
       "data": {
           "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTljYWFjZTQxZGRkYjEwMTY2MDRmZTQiLCJyb2xlIjoiZHJpdmVyIiwicmVjZWl2ZU5vdGlmeSI6dHJ1ZSwiYXZhdGFyIjoiIiwicGF0aEltYWdlIjoiaHR0cDovLzUyLjc3LjI0NS4xOTU6ODg4OC9wdWJsaWMvIiwiaWF0IjoxNTIwMjE2NzgyLCJleHAiOjE1MjI4MDg3ODJ9.hS4gjrxsFKItO2OmbUspe0wNMUydgloDxAsxSBnaqrc"
       }
   }
   *
   * @apiSuccessExample {JSON} Response: HTTP/1.1 400 Bad
   {
       "status": 400,
       "errorMessage": "Account: nguyenmanhit.mak2@gmail.com is already taken.",
       "error": {}
   }
   *
   */
  register(req, res) {
    req.check('email', 'Email is required!').notEmpty();
    req.check('email', 'Email invalid!').isEmail();
    req.check('password', 'Password must be longer than 8 characters!').isLength({
      min: 8,
      max: 40
    });
    req.check('password', 'Password is not match the requirement')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])(?=.{8,})/);
    req.check('osType', 'Missing os type!').isIn(['ios', 'android', 'web']);
    req.check('phone', 'Missing phone number').notEmpty();
    if (req.body.osType !== 'web') {
      if (req.body.osType === 'android') {
        req.check('deviceToken', 'Device token invalid!').isLength({
          min: 64,
          max: 64
        });
      } else {
        req.check('deviceToken', 'Device token invalid!').isLength({
          min: 64,
          max: 256
        });
      }
    }
    let errors = req.validationErrors(true);
    if (errors) {
      return validationParamError(res, errors);
    }
    let bodyData = req.body;
    bodyData = _.pick(bodyData, ['email', 'password', 'deviceToken', 'osType', 'phone']);
    localService.register(bodyData)
      .then(userData => {
        return res.ok(userData);
      })
      .catch(error => {
        res.bad(error);
      });
  }
}