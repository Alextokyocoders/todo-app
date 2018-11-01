'use strict';

import mongoose from 'mongoose';
import async from 'async';

/**
 * @param {Object?} [params={}]
 * @param {Number} [params.page_size=10]
 * @param {Number} [params.page=1]
 * @param {String} [params.sort="_id"] sample params.sort = name:1;address:2
 * @param {String} [params.select=""]
 * @param {String} [params.populations=""]
 * @param {{page_size?: Number, page?: Number, sort?: String, select?: String, populations?: String} || Function} [callback]
 * @returns {Promise}
 */
mongoose.Query.prototype['paginate'] = function (params, callback) {
  if ('function' === typeof params) {
    callback = params;
    params = {};
  }
  if (!params) params = {};
  params.page = +params.page || 1;
  params.page_size = +params.page_size || 10;
  params.select = params.select || Object.keys(this.model.schema.obj);
  // Sorting
  let sort = {
    _id: -1
  };
  if (params.sort) {
    sort = {};
    const sortValues = params.sort.split(';');
    sortValues.forEach(sv => {
      const value = sv.split(':');
      sort[value[0]] = +(value[1] || 1); // default order sort = 1
    });
  }
  // query
  let queryDocs = this
    .select(params.select)
    .sort(sort);
  if (params.page_size !== -1) {
    queryDocs = queryDocs
      .skip((params.page - 1) * params.page_size)
      .limit(params.page_size);
  }
  let queryCount = this.model.count(this._conditions);

  // Populations
  if (params.populations) {
    let fields = params.populations.split(' ');
    fields.forEach(field => {
      queryDocs = queryDocs.populate(field);
    });
  }
  return new Promise((resolve, reject) => {
    async['parallel']({
      data: cb => queryDocs.exec(cb),
      total_item: cb => queryCount.exec(cb)
    }, (err, result) => {
      if (!err && result) {
        result.page = params.page;
        result.page_size = params.page_size === -1 ? result.data.length : params.page_size;
        result.total_page = Math.ceil(result.total_item / result.page_size);
      }
      if (typeof callback === 'function') return callback(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module['exports'] = 'Mongoose#Query';