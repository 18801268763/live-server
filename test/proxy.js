let request = require('supertest');
let path = require('path');
let port = 40200;
let server1 = require('..').start({
	root: path.join(__dirname, "data"),
	port: port,
	open: false
});
let server2 = require('..').start({
	root: path.join(__dirname, "data"),
	port: 0,
	open: false,
	proxy: [
		["/server1", "http://localhost:" + port]
	]
});

describe('proxy tests', function() {
	it('should respond with proxied content', function(done) {
		request(server2)
			.get('/server1/index.html')
			.expect('Content-Type', 'text/html; charset=UTF-8')
			.expect(/Hello world/i)
			.expect(200, done);
	});
});


