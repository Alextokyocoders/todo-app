/**
 * @author ManhNV
 * @description define constant
 */
'use strict';

exports.PatternSetup = {
  patternName: /^\w+[A-Za-z\s\d]+$/,
  patternNameSpecial: /[~!@#$%^&*()-+=<>,?\/\\:;"']/,
  patternEmail: /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
  patternPhone: /^(\+?84|0)(1[2689]|[89])[0-9]{8}$/,
  patternNumber: /^\d+$/
};
