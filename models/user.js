/**
 * user information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_schema = new Schema({
	real_name: {type: String},
	password: {type: String},
	avatar: {type: String},
	sex: {type: Number},
	phone: {type: String},
	school: {type: String},
	signature: {type: String}
},{
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

user_schema.index({phone: 1}, {unique: true});
mongoose.model('User', user_schema);