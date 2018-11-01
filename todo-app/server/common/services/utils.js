/**
 * @author: ManhNV
 * @last Modified by: ManhNV
 * @last Modified time: 2017-03-28 14:43:41
 */

'use strict';
import _ from 'lodash';
import dot from 'dot-object';
import moment from 'moment';
import MobileDetect from 'mobile-detect';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;


export function isMobile(req) {
  let md = new MobileDetect(req.headers['user-agent']);
  return md.mobile();
}

/**
 * @method {calculateDistance}
 * Calculate distance between two latitude-longitude points
 * @param  {[type]} add1 [description]
 * @param  {[type]} add2 [description]
 * @return {[type]}      [description]
 */
export function calculateDistance(add1, add2) {
  if (!add1 || !add2) return -1;
  let lat1 = add1.lat;
  let lng1 = add1.lng;
  let lat2 = add2.lat;
  let lng2 = add2.lng;
  // eslint-disable-next-line no-shadow
  let deg2rad = 0.017453292519943295; // === Math.PI / 180
  let cos = Math.cos;
  lat1 *= deg2rad;
  lng1 *= deg2rad;
  lat2 *= deg2rad;
  lng2 *= deg2rad;
  let diam = 12742; // Diameter of the earth in km (2 * 6371)
  let a = (
    1 - cos(lat2 - lat1)
    + (1 - cos(lng2 - lng1)) * cos(lat1) * cos(lat2)
  ) / 2;
  return Math.round(diam * Math.asin(Math.sqrt(a)));
}

/**
 * @method {merge}
 * @param obj
 * @param src
 * @returns {*}
 */
export function merge(obj, src) {
  _.merge(obj, src, function (a, b) {
    if (_.isArray(a)) {
      if (b !== null && b !== undefined) {
        if (_.isArray(b)) {
          return [].concat(b);
        } else {
          return b;
        }
      } else {
        return a;
      }
    } else if ('object' === typeof a && 'object' === typeof b) {
      return merge(a, b);
    }
  });
  return obj;
}

/**
 * @method {parseNestedKeyToObj}
 * @description: Parser nested key string => object key
 * @summary: detail references - https://www.npmjs.com/package/dot-object
 * @param req
 * @param res
 * @param next
 */
export function parseNestedKeyToObj(req, res, next) {
  req.body = dot.object(req.body);
  next();
}

/**
 * @method {mergeArrayObjectId}
 * @description: Validate array string Id[] => remove item id duplicate => convert string Id[] to ObjectID []
 * @param Ids
 * @returns {Promise<T>|Promise}
 */
export function mergeArrayObjectId(Ids) {
  return new Promise((resolve, reject) => {
    let arrayString = [];
    if (!Array.isArray(Ids)) {
      if (!IdValid(Ids)) {
        return reject('Ids must be a list of ids!');
      } else {
        arrayString.push(ObjectId(Ids));
        return resolve(arrayString);
      }
    } else {
      let sum = 0;
      _.find(Ids, id => {
        if (!IdValid(id)) {
          sum++;
        }
      });
      if (sum === 0) {
        arrayString = _.map(_.uniq(Ids), function (id) {
          return ObjectId(id);
        });
        return resolve(arrayString);
      } else {
        return reject('Ids must be a list of ids!');
      }
    }
  });
}

/**
 * @method {uniqObjectId}
 * @description: Concat 2 object => remove object Id Duplicate
 * @param arrObjectIdA
 * @param arrObjectIdB
 */
export function uniqObjectId(arrObjectIdA, arrObjectIdB) {
  let arrObjectIdAString = _.map(arrObjectIdA, objIdA => {
    return objIdA.toString();
  });
  let arrObjectIdBString = arrObjectIdB.map(objIdB => {
    return objIdB.toString();
  });

  return _.map(_.uniq(arrObjectIdAString.concat(arrObjectIdBString)), objId => {
    return ObjectId(objId);
  });
}

/**
 * @method getDistanceFromLatLon
 * @description unit met (m)
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
export function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1))
    * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance in km
}

/**
 * @method validationSSN
 * @description validate ssn
 * @param {string} value
 * @return {boolean}
 */
export function validationSSN(value) {
  const blacklist = ['078051120', '219099999', '457555462'];
  const expression = /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/;
  if (!expression.test(value)) {
    return false;
  }
  return blacklist.indexOf(value.replace(/\D/g, '')) === -1;
}

export function genRandomInt(min = 100000, max = 999999) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function toQuater(date) {
  return moment(date).quarter();
}

export function roundTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

//convert mobile number to international format
export function phoneToPhoneCode(phoneNumber) {
  let countryCode = '84' // 1 is phone code of US  

  //Remove any parentheses and the numbers they contain:
  phoneNumber = phoneNumber.replace("/\([0-9]+?\)/", "");

  //Strip spaces and non-numeric characters:
  phoneNumber = phoneNumber.replace("/[^0-9]/", "");

  //Strip out leading zeros:
  while (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.slice(1);
  }

  //Check if the number doesn't already start with the correct dialling code:
  let patten = new RegExp('/^' + countryCode + '/');
  if (!patten.test(patten)) {
    phoneNumber = '+' + countryCode + phoneNumber;
  }
  return phoneNumber;
}