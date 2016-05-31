/**
 * skill cooperation
 */
'use strict';

const model = require('../models');
const Skill = model.Skill;

/**
 * add skill
 * @param  {Object}   skill   [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.add_skill = (skill, callback) => {
    let new_skill = new Skill(skill);
    return callback ? new_skill.save(callback) : new_skill.save();
}

/**
 * get skill
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.get_skill = (query, fields, options, callback) => {
    return callback ? Skill.find(query, fields, options, callback) : Skill.find(query, fields, options).exec();
}

/**
 * update skill
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.update_skill = (query, options, callback) => {
    return callback ? Skill.update(query, options, callback) : Skill.update(query, options).exec();
}

/**
 * delete skill
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.delete_skill = function (query, callback) {
    return callback ? Skill.remove(query, callback) : Skill.remove(query).exec();
};