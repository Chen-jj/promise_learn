var expect = require('chai').expect;

var Merge = require('../lib/optionsMerge');

//test suite
describe('optionsMerge', function() {

	it('直接调用应该返回Merge实例', function() {
		expect(Merge('http://jdc.jd.com')).to.be.an.instanceof(Merge);
	})

	it('只有支持绝对地址', function() {
		expect(function() {Merge('jdc.jd.com');}).to.throw("only absolute urls are supported.");
	})

	it('只支持http或https协议', function() {
		expect(function() {Merge('http://jdc.jd.com')}).to.not.throw(Error);
		expect(function() {Merge('https://jdc.jd.com')}).to.not.throw(Error);
		expect(function() {Merge('ftp://jdc.jd.com')}).to.throw("only http(s) protocols are supported.");
	})

	it('应该支持自定义属性', function() {
		var options = new Merge('http://jdc.jd.com', {
			method: "POST",
			headers: {
				a: "1"
			}
		});
		expect(options.method).to.equal("POST");
		expect(options.headers.a).to.equal("1");
	})

	it('应该初始化request headers的Accept、Connection、User-Agent字段', function() {
		var options = new Merge('https://api.github.com');
		expect(options.headers['Accept']).to.be.a('string');
		expect(options.headers['Connection']).to.be.a('string');
		expect(options.headers['User-Agent']).to.be.a('string');

		options = new Merge('https://api.github.com', {
			headers: {
				'Accept': 'text/html',
				'Connection': 'keep-alive',
				'User-Agent': 'chrome'
			}
		})
		expect(options.headers["Accept"]).to.equal('text/html');
		expect(options.headers["Connection"]).to.equal('keep-alive');
		expect(options.headers["User-Agent"]).to.equal('chrome');
	})

})