'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const cultivation = controllers.cultivation;

router.post('/sprout/v1/cultivation', cultivation.add_cultivation);
router.get('/sprout/v1/cultivation', cultivation.get_cultivation);
router.put('/sprout/v1/cultivation/:id', cultivation.update_cultivation);
//router.delete('/sprout/v1/cultivation/:id', cultivation.delete_cultivation);

module.exports = router;