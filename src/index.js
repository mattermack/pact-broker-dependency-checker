var http = require('http');

var cmdOptions = getOptions();
var query = buildQuery(cmdOptions);

// move to a configuration file or command line option
var httpOptions = {
	host : 'localhost',
	path : '/' + query,
	port : '3000',
	method : 'GET'
};


callback = function(response) {
	var str = '';
	response.on('data', function(chunk) {
		str += chunk;
	});

	response.on('end', function() {
		// process response
		processResponse(str);
	});
}

var req = http.request(httpOptions, callback);
req.end();



function processResponse(res) {
	var jsonResponse = JSON.parse(res);
	
	jsonResponse.results.forEach(function(element) {	
	    if (element.providerName == cmdOptions.providerName &&
	    		element.consumerName == cmdOptions.consumerName &&
	    		element.providerVersion == cmdOptions.providerVersion &&
	    		element.consumerVersion == cmdOptions.consumerVersion
	    ) {
	    	if (element.verification == true) {
	    		console.log("Pass");
	    		//success
	    		process.reallyExit(0);
	    	}
	    	else {
	    		console.log("Fail");
	    		//error
	    		process.reallyExit(1);
	    	}
	    }
	});
	
	console.log("Error");
	// not found
	process.reallyExit(2);	
}


function buildQuery(options) {
	var queryArr = [];
	if (options.providerName) {
		queryArr.push("providerName=" + options.providerName);
	}
	if (options.providerVersion) {
		queryArr.push("providerVersion=" + options.providerVersion);
	}
	if (options.consumerName) {
		queryArr.push("consumerName=" + options.consumerName);
	}
	if (options.consumerVersion) {
		queryArr.push("consumerVersion=" + options.consumerVersion);
	}
	return "?" + queryArr.join("&");
}


/*
	From node-command-line-option
*/
function getOptions() {
	
	var args = process.argv.slice(2);

	var options = {};
	for(var i in args) {
	    if(args[i].indexOf("--") == 0 ) {
	        var key = args[i].substr(2);
	        res = key.split(/=(.+)?/);
	        options[res[0]]=res[1];
	    }
	}

	return options;
}