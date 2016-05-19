/**
 * note information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const note_schema = new Schema({
	initial_time: {type: Date},
	edit_time: {type: Date},
	content: {type: String},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

note_schema.index({edit_time: -1});
mongoose.model('note', note_schema);