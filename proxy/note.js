/**
 * note cooperation
 */
'use strict';

const model = require('../models');
const Note = model.Note;

/**
 * add note
 * @param  {Object}   note   [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.add_note = (note, callback) => {
    let new_note = new Note(note);
    return callback ? new_note.save(callback) : new_note.save();
}

/**
 * get note
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.get_note = (query, fields, options, callback) => {
    return callback ? Note.find(query, fields, options, callback) : Note.find(query, fields, options).exec();
}

/**
 * update note
 * @param  {Object}   query    [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
exports.update_note = (query, options, callback) => {
    return callback ? Note.update(query, options, callback) : Note.update(query, options).exec();
}