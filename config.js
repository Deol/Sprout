const config = {
	local_db: 'mongodb://127.0.0.1/sprout',
	remote_db: 'mongodb://119.29.240.125/sprout',

	session_secret: 'callmesprout',
	auth_cookie_name: 'Sprout',

	// redis 配置，默认本地
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db: 0
}

module.exports = config;