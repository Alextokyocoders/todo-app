/**
 * @author ManhNV
 * @description customer express validation
 */

import moment from 'moment';
import * as util from '../services/utils';

let IdValid = require('mongoose').Types.ObjectId.isValid;

exports.customExpressValidation = {
  isArray: value => {
    return Array.isArray(value);
  },
  isObjectId: value => {
    return IdValid(value);
  },
  isString: value => {
    return 'string' === typeof value;
  },
  gte: (param, num) => {
    return param >= num;
  },
  isDob: value => {
    return moment(value, 'YYYY/MM/DD').isValid();
  },
  isSSN: value => {
    return util.validationSSN(value);
  }
};
