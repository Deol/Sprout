'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const user = controllers.user;

router.post('/sprout/v1/user/login', user.login);
router.get('/sprout/v1/user/logout', user.logout);
//router.post('/sprout/v1/user/register', user.add_user);
//router.put('/sprout/v1/user/:id', user.update_user);

module.exports = router;