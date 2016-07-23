//Simple Node.js application to start server using express
var express = require('express');
var app = express();

app.get('/', function(req,res){
	
	res.send("Hello World!");
});

var server = app.listen(8085, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server listening at http://%s:%s",host,port);
});

