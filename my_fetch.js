var http = require('http');
var https = require('https');

var OptionsMerge = require('./lib/optionsMerge');

function fetch(_url, _opts) {

	return new Promise(function(resolve, reject) {

		//options
		try {
			var _options = OptionsMerge(_url, _opts);
		} catch (err) {
			reject(err);
		}
		//protocol
		var send = _options.protocol === 'https:' ? https : http;

		var req = send.request(_options, function(res) {
			var chunk = '';

			res.on('data', function(data) {
				chunk += data;
			})

			res.on('end', function() {
				resolve(res);
			})
		})
		req.end();
	})
}

module.exports = fetch;
