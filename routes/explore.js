'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const explore = controllers.explore;

router.get('/sprout/v1/explore', explore.get_explore);
router.post('/sprout/v1/explore', explore.add_explore);
router.put('/sprout/v1/explore/:id', explore.update_explore);
//router.delete('/sprout/v1/explore/:id', explore.delete_explore);

module.exports = router;