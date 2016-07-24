var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

//Importing all statuc files in the current directory
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended : true}));

//Saving JSON Data into json file and responding back to request 
function saveJSONDataAndRespond(file,data,res)
{
	fs.writeFile(file, data, function(err,data){
			if(err)
			{
				console.log(err);
				return err;
			}
			response ={
					message : "file uploaded successfully"
				};
			res.end(JSON.stringify(response));
		});
}

//GET to retrieve all contacts
app.get('/GetAllContacts', function(req,res){
	console.log( "getting all contacts" );
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   res.end( data );
   });
});

//GET to retrieve contact details of Id specified
app.get('/GetSpecificContact', function(req,res){
	console.log( "getting specific contacts" );
	var id  = req.query.id;
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   
	   var users = JSON.parse( data );
	   //extracting the desired record
	   var response = users["user" + id];
	   var jsonData = {};
	   jsonData.data = response;
	   var finalData = JSON.stringify(jsonData)
	   res.end(finalData);
   });
	
});

//POST to add new contacts
app.post('/SaveContact', function(req,res){
	console.log("Saving data");
	
	var record = req.body;
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		var maxId = 0;
		data = JSON.parse(data);
		//finding unique Id for new record
		for(var entry in data)
		{
			if(maxId < data[entry].id)
				maxId = data[entry].id;
		}
		record.id = maxId+1;
		var user = "user" + record.id;
		data[user] = record;
		data = JSON.stringify(data);
		
		saveJSONDataAndRespond(__dirname + "/" + "users.json", data,res);
   });
});

//GET to delete contact whose id is specified
app.get('/DeleteSpecificContact', function(req,res){
	
	console.log( "Deleting contact" );
	var id  = req.query.id;
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   
	   var users = JSON.parse( data );
	   //deleting the desired record
	   delete users["user" + id];
	   var finalData = JSON.stringify(users);
	   
	   saveJSONDataAndRespond(__dirname + "/" + "users.json", finalData,res);
   });
	
});

//starting the server and listening at 8085
var server = app.listen(8085, 'localhost', function(){
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening to server at : http://%s:%s", host,port);
})
