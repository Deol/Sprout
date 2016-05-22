/**
 * 自我修养模块
 */
'use strict';

const proxy = require('../proxy/');
const Cultivation = proxy.Cultivation;
const _ = require('lodash');
const validator = require('validator');
const response_code = require('../common/response_code').response_code;

/**
 * 获取自我修养信息
 * @param  {[type]}	  req  [description]
 * @param  {[type]}	  res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.get_cultivation = (req, res, next) => {

	let query = {};

	let feilds = {__v: 0};
	let options = {
		sort: {
			initial_time: -1
		}
	};

	return Cultivation.get_cultivation(query, feilds, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		});
}

/**
 * 增加自我修养
 * @param  {[type]}	  req   [description]
 * @param  {[type]}	  res   [description]
 * @param  {Function} next  [description]
 * @return {[type]}		      [description]
 */
exports.add_cultivation = (req, res, next) => {

	let cultivation_info = {
		title: req.body.title,
		content: req.body.content,
		initial_time: req.body.initial_time
	}

	let not_complete = _.keys(cultivation_info).some((item) => {
	    return !cultivation_info[item];
	});

	// 参数不完整
  	if (not_complete) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Cultivation.add_cultivation(cultivation_info)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}

/**
 * 修改自我修养资料
 * @param  {[type]}  	req  [description]
 * @param  {[type]} 	res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.update_cultivation = (req, res, next) => {

	let id = validator.trim(req.params.id);

	let options = {
		title: req.body.title,
		content: req.body.content,
		initial_time: req.body.initial_time
	}

	let not_complete = _.keys(options).some((item) => {
	    return !options[item];
	});

	// 参数不完整
  	if (not_complete || !id) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Cultivation.update_cultivation({_id: id}, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}