/**
 * user cooperation
 */
'use strict';

const model = require('../models');
const User = model.User;

/**
 * get user
 * @param  {Object}   query    [description]
 * @param  {Object}   options  [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.get_user = (query, fields, options, callback) => {
    return callback ? User.findOne(query, fields, options, callback) : User.findOne(query, fields, options).exec();
}

/**
 * add user
 * @param  {Object}   user   [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.add_user = (user, callback) => {
    let new_user = new User(user);
    return callback ? new_user.save(callback) : new_user.save();
}

/**
 * update user information
 * @param  {Object}   query    [description]
 * @param  {Object}   options  [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.update_user = (query, options, callback) => {
    return callback ? User.update(query, options, callback) : User.update(query, options).exec();
}
