var fetch = require('./my_fetch');

/*var url = 'http://wq.jd.com/mcoss/ranklist/bshow';
var querystring = {
	"rids":     1070,
	"sn":       1
}

fetch(url, {
	querystring: querystring
})
.then(function(res) {
	console.log("my_fetch data: " + res);

	return JSON.parse(res).rank[0].cdata[0];
})
.then(function(res) {
	console.log(res)
});*/

//todos
//catch error
//post data

var url = 'ftp://api.github.com';

fetch(url)
.then(function(res) {
	console.log(res);
})
.catch(function(err) {
	console.log('cathch: ', err);
})