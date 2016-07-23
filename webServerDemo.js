//Simple web server application in Node.Js
var http = require('http');
var fs = require('fs');
var url = require('url');

//HTTP Server
http.createServer( function(request,response){
	
	var path = url.parse(request.url).pathname;
	console.log("Request for " + path + " Received");
	
	//Read requested file content from file systemLanguage
	fs.readFile(path.substr(1),function(err,data){
		if(err)
		{
			console.log(err);
			//HTTP 404 - File not found
			response.writeHead(404, {'Content-type' : 'text/html'});
		}
		else
		{
			//HTTP 200 - File Found OK
			response.writeHead(200, {'Content-type' : 'text/html'});
			response.write(data.toString());
		}
		//Sending response
		response.end();
			
	});
	
}).listen(8085);

console.log("Server listening at http://127.0.0.1:8085");


//HTTP Client

var options = {
	host : 'localhost',
	port : '8085',
	path : '/index.htm'
};


var callback = function(response)
{
	var body = '';
	response.on('data', function(data){
		body += data;
	});
	
	response.on('end', function(){
		console.log(body);
	});
}

var req = http.request(options,callback);
req.end();