const express = require('express')
const app = express()

app.set('json spaces', 10);

app.get('/', function(req, res) {
	var results = {
		"results" : [ {
			"providerName" : "P",
			"providerVersion" : "2.0.7",
			"consumerName" : "B",
			"consumerVersion" : "4.1.1",
			"verification" : true
		}, {
			"providerName" : "P",
			"providerVersion" : "2.0.7",
			"consumerName" : "B",
			"consumerVersion" : "4.1.2",
			"verification" : false
		} ]
	};
	
	res.json(results);
})

app.listen(3000, function() {
	console.log('Mock broker listening on port 3000')
})