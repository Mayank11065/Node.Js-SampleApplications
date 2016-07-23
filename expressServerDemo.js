//Simple Node.js application to start server using express
//need to download following modules - express, body-parser
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));

app.use(multer({dest: __dirname + "/uploads/"}).single('file'));

//Different HTTP Protocols supported by express based server
//Listening to all GET requests at http://localhost:8085/
app.get('/', function(req,res){
	console.log("got a post request for homepage");
	res.send("Hello GET!");
});

//Listening to all POST requests at http://localhost:8085/
app.post('/', function(req,res){
	console.log("got a post request for homepage");
	res.send("Hello POST!");
});

//Listening to all Delete requests at http://localhost:8085/
app.delete('/delete_user', function(req,res){
	console.log("got a delete request for delete_user");
	res.send("Hello DELETE!");
});

//Listening to all GET requests at http://localhost:8085/list_user
app.get('/list_user', function(req,res){
	console.log("got a get request for list_user");
	res.send("Hello GET list_user!");
});

//Listening to all GET requests at pattern matching : http://localhost:8085/ab*cd
app.get('/ab*cd', function(req,res){
	console.log("got a get request for ab*cd");
	res.send("Hello! Pattern Matching");
});

//Display HTML Page
app.get('/expressIndexGet.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "expressIndexGet.htm" );
})

//Display HTML Page
app.get('/expressIndexPost.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "expressIndexPost.htm" );
})

//Display HTML Page
app.get('/expressIndexfileUpload.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "expressIndexfileUpload.htm" );
})

//Accept GET request with form data and send the response
app.get('/process_get',function(req,res){
	var response = {
		first_name : req.query.first_name,
		last_name : req.query.last_name
	};
	
	console.log(response);
	res.end(JSON.stringify(response));
});


//Accept POST request with form data and send the response
app.post('/process_post', function(req,res){
	var response = {
		first_name : req.body.first_name,
		last_name : req.body.last_name
	};
	
	console.log(response);
	res.end(JSON.stringify(response));
});

app.post('/file_upload', function(req,res){
	console.log(req.file);
	console.log(req.file.originalname);
	console.log(req.file.path);
	console.log(req.file.type);
	
	var file = req.file.destination + "/" + req.file.originalname;
	
	fs.readFile(req.file.path, function(err,data){
		fs.writeFile(file, data, function(err,data){
			if(err)
				console.log(err);
			else
			{
				console.log("file uploaded successfully");
				response ={
					message : "file uploaded successfully",
					filename : req.file.originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});

var server = app.listen(8085,'localhost', function(){
	
	var host = server.address().address
	var port = server.address().port
	
	console.log("Server listening at http://%s:%s",host,port);
});

