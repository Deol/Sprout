/**
 * explore information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const explore_schema = new Schema({
    illustration: {type: String},
    title: {type: String},
    introduce: {type: String},
    initial_time: {type: Date},
    hyperlink: {type: String},
    belong_tag: {type: Number}
});

explore_schema.index({initial_time: -1});
mongoose.model('Explore', explore_schema);