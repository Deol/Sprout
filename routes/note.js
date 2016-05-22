'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const note = controllers.note;

router.post('/sprout/v1/note', note.add_note);
router.get('/sprout/v1/note/:user_id', note.get_note);
router.put('/sprout/v1/note/:id', note.update_note);
//router.delete('/sprout/v1/note/:id', note.delete_note);

module.exports = router;