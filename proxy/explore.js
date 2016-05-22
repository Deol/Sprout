/**
 * explore cooperation
 */
'use strict';

const model = require('../models');
const Explore = model.Explore;

/**
 * add explore
 * @param  {Object}   explore   [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.add_explore = (explore, callback) => {
    let new_explore = new Explore(explore);
    return callback ? new_explore.save(callback) : new_explore.save();
}

/**
 * get explore
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.get_explore = (query, fields, options, callback) => {
    return callback ? Explore.find(query, fields, options, callback) : Explore.find(query, fields, options).exec();
}

/**
 * update explore
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.update_explore = (query, options, callback) => {
    return callback ? Explore.update(query, options, callback) : Explore.update(query, options).exec();
}