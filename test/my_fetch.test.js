var chai = require('chai');
var cap = require('chai-as-promised');
chai.use(cap);
var expect = chai.expect;

var fetch = require('../my_fetch');

//test suite
describe('my_fetch', function() {

	it('应该返回promise', function() {
		var temp = fetch('http://jdc.jd.com');
		expect(temp).to.be.an.instanceof(Promise);
		expect(fetch('http://jdc.jd.com')).to.have.property('then');
	})

	it('当url不是绝对地址时应该reject', function() {
		return expect(fetch('some/url')).to.eventually.be.rejectedWith(Error);
	})

	it('当协议不为http或https时应该reject',  function() {
		return expect(fetch('ftp://jdc.jd.com')).to.eventually.be.rejectedWith(Error);
	})

	it('应该resolve请求的相应结果(http)', function() {
		var url = 'http://jdc.jd.com';
		return fetch(url).then(function(res) {
			expect(res.statusCode).to.equal(200);
		})
	})

	it('应该resolve请求的相应结果(https)', function(done) {
		var url = 'https://api.github.com';
		fetch(url).then(function(res) {
			expect(res.statusCode).to.equal(200);
			done();
		})
	})

})