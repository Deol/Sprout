'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const skill = controllers.skill;

router.get('/sprout/v1/skill', skill.get_skill);
router.post('/sprout/v1/skill', skill.add_skill);
router.put('/sprout/v1/skill/:id', skill.update_skill);
//router.delete('/sprout/v1/skill/:id', skill.delete_explore);

module.exports = router;