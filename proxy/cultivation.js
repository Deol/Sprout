/**
 * cultivation cooperation
 */
'use strict';

const model = require('../models');
const Cultivation = model.Cultivation;

/**
 * add cultivation
 * @param  {Object}   cultivation   [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.add_cultivation = (cultivation, callback) => {
  let new_cultivation = new Cultivation(cultivation);
  return callback ? new_cultivation.save(callback) : new_cultivation.save();
}

/**
 * get cultivation
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.get_cultivation = (query, fields, options, callback) => {
  return callback ? Cultivation.find(query, fields, options, callback) : Cultivation.find(query, fields, options).exec();
}

/**
 * update cultivation
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.update_cultivation = (query, options, callback) => {
  return callback ? Cultivation.update(query, options, callback) : Cultivation.update(query, options).exec();
}