/**
 * explore information
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const explore_schema = new Schema({
    picture: {type: String},
    title: {type: String},
    intro: {type: String},
    initial_time: {type: Date},
    hyperlink: {type: String},
    belong_tag: {type: String}
});

explore_schema.index({initial_time: -1});
mongoose.model('Explore', explore_schema);