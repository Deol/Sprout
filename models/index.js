'use strict';

const mongoose = require('mongoose');
const config = require('../config');

let db = process.env.DB === 'remote' ? config.remote_db : config.local_db;
let connection = mongoose.connect(db, {}, function (err) {
    if (err) {
        console.log("数据库连接失败：" + err);
        process.exit(1);
    }
});

// require models
require('./user.js');
require('./note.js');
require('./skill.js');
require('./explore.js');
require('./cultivation.js');

module.exports = {
    User: mongoose.model('User'),
    Note: mongoose.model('Note'),
    Skill: mongoose.model('Skill'),
    Explore: mongoose.model('Explore'),
    Cultivation: mongoose.model('Cultivation'),
}