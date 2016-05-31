/**
 * skill information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const skill_schema = new Schema({
    title: {type: String},
    intro: {type: String},
    book: {type: Array},
    expand: {type: String},
    belong_tag: {type: String},
    initial_time: {type: Date}
});

skill_schema.path('initial_time').get(v => moment(v).format('YYYY.MM.DD'));
skill_schema.index({title: 1}, {unique: true});
mongoose.model('Skill', skill_schema);