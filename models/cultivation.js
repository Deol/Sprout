/**
 * cultivation information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cultivation_schema = new Schema({
    title: {type: String},
    content: {type: String},
    initial_time: {type: Date}
});

cultivation_schema.index({initial_time: -1});
mongoose.model('Cultivation', cultivation_schema);