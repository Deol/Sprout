/**
 * 发现探索模块
 */
'use strict';

const proxy = require('../proxy/');
const Explore = proxy.Explore;
const _ = require('lodash');
const validator = require('validator');
const response_code = require('../common/response_code').response_code;

/**
 * 获取发现探索信息
 * @param  {[type]}	  req  [description]
 * @param  {[type]}	  res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.get_explore = (req, res, next) => {

	let belong_tag = req.query.belong_tag;
	let query = {belong_tag: belong_tag};

	let feilds = {__v: 0};
	let options = {
		sort: {
			initial_time: -1
		}
	};

	return Explore.get_explore(query, feilds, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		});
}

/**
 * 增加发现探索
 * @param  {[type]}	  req   [description]
 * @param  {[type]}	  res   [description]
 * @param  {Function} next  [description]
 * @return {[type]}		      [description]
 */
exports.add_explore = (req, res, next) => {

	let explore_info = {
		illustration: req.body.illustration,
		title: req.body.title,
		introduce: req.body.introduce,
		initial_time: req.body.initial_time,
		hyperlink: req.body.hyperlink,
		belong_tag: req.body.belong_tag
	}

	let not_complete = _.keys(explore_info).some((item) => {
	    return !explore_info[item];
	});

	// 参数不完整
  	if (not_complete) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Explore.add_explore(explore_info)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}

/**
 * 修改发现探索资料
 * @param  {[type]}  	req  [description]
 * @param  {[type]} 	res  [description]
 * @param  {Function} next [description]
 * @return {[type]}		     [description]
 */
exports.update_explore = (req, res, next) => {

	let id = validator.trim(req.params.id);

	let options = {
		illustration: req.body.illustration,
		title: req.body.title,
		introduce: req.body.introduce,
		initial_time: req.body.initial_time,
		hyperlink: req.body.hyperlink,
		belong_tag: req.body.belong_tag
	}

	let not_complete = _.keys(options).some((item) => {
	    return !options[item];
	});

	// 参数不完整
  	if (not_complete || !id) {
		return res.send({code: 113, msg: response_code['113']});
	}

	return Explore.update_explore({_id: id}, options)
		.then((data) => {
			res.send({code: 1, msg: response_code['1'], data: data});
		})
		.catch((e) => {
			res.send({code: 13, msg: response_code['13'], err: e});
		})
}