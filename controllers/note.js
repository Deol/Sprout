/**
 * 笔记模块
 */
'use strict';

const proxy = require('../proxy/');
const Note = proxy.Note;
const _ = require('lodash');
const validator = require('validator');
const response_code = require('../common/response_code').response_code;

/**
 * 获取笔记信息
 * @param  {[type]}	  req  [description]
 * @param  {[type]}	  res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.get_note = (req, res, next) => {

	let user = validator.trim(req.query.user_id);
	
	let query = {user: user};
	let feilds = {__v: 0};
	let options = {
		sort: {
			edit_time: -1
		}
	};

	if (!user) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Note.get_note(query, feilds, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		});
}

/**
 * 增加笔记
 * @param  {[type]}	  req   [description]
 * @param  {[type]}	  res   [description]
 * @param  {Function} next  [description]
 * @return {[type]}		      [description]
 */
exports.add_note = (req, res, next) => {

	let note_info = {
		initial: req.body.initital,
		content: req.body.content,
		user: req.body.user_id,
		edit_time: req.body.edit_time
	}

	let not_complete = _.keys(note_info).some((item) => {
	    return !note_info[item];
	});

	// 参数不完整
  	if (not_complete) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Note.add_note(note_info)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}

/**
 * 修改笔记资料
 * @param  {[type]}  	req  [description]
 * @param  {[type]} 	res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.update_note = (req, res, next) => {

	let id = validator.trim(req.params.id);

	let options = {
		initial: req.body.initital,
		content: req.body.content,
		user: req.body.user_id,
		edit_time: req.body.edit_time
	}

	let not_complete = _.keys(options).some((item) => {
	    return !options[item];
	});

	// 参数不完整
  	if (not_complete) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Note.update_note({_id: id}, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}