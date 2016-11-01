var url = require('url');
var querystring = require('querystring');

/**
 * [optionsMerge description]
 * @param  { string } input [url]
 * @param  { object } init  [obj with keys: querystring, headers, method, body]
 * @return { object }       [description]
 */
function optionsMerge(input, init) {

	if (!(this instanceof optionsMerge))
		return new optionsMerge(input, init);

	init = init || {};
	input += init.querystring ? ("?" + querystring.stringify(init.querystring)) : "";
	var url_parse = url.parse(input);

	if (!url_parse.protocol || !url_parse.hostname)
		throw new Error("only absolute urls are supported.");

	if (url_parse.protocol !== "http:" && url_parse.protocol !== "https:")
		throw new Error("only http(s) protocols are supported.");

	this.protocol = url_parse.protocol;
	this.hostname = url_parse.hostname;
	this.path     = url_parse.path;

	this.method   = init.method || "GET";
	this.headers  = init.headers || {};
	this.body     = init.body || null;

	if (!this.headers["Accept"])
		this.headers["Accept"] = "*/*";
	if (!this.headers["Connection"])
		this.headers["Connection"] = "close";
	if (!this.headers["User-Agent"])
		this.headers["User-Agent"] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36";

}

module.exports = optionsMerge;