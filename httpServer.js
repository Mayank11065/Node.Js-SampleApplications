//HTTP server using http module
var http = require('http');
http.createServer( function(request, response){
	
	// Send HTTP header with HTTP Status : 200(OK) and Content Type: text/plain
	response.writeHead(200,{'Content-Type':'text/plain'});
	
	// Send the response body
	response.end("Hello World!\n");
	
	}).listen(8085);

// Print the server url on console
console.log("Server running at : http://127.0.0.1:8085");
