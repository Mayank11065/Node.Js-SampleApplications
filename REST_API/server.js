var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

//Using Mysql to store data. Please modify the properties to appropriate values to use this file.
var MySQL_host = "localhost";
var MySQL_username = "testUser";
var MySQL_password = "password";
var MySQL_db = "test";
var MySQl_table = "contactData";
var MySQl_conn_limit = 100;
var MySql_SelectQuery = "Select * from " + MySQl_table;
var MySql_SelectOneQuery = "Select * from " + MySQl_table + " where ";
var MySQL_UpdateQuery = "Insert into " + MySQl_table + " SET ? ";
var MySQL_DeleteQuery = "DELETE FROM " + MySQl_table +" WHERE id = ";

//Importing all statuc files in the current directory
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended : true}));

//Assumes port be default - 3306
var pool = mysql.createPool({
	connectionLimit : MySQl_conn_limit,
	host : MySQL_host,
	user : MySQL_username,
	password : MySQL_password,
	database : MySQL_db,
	debug : false
});

//Fetches records based on data. If id is given, only that specific record is fetched, else, all records are fetched
function showDataFromTable(req,res)
{
	var data = req.query.id;
	pool.getConnection(function(err,connection){
		if(err)
		{
			res.json({"code" : 100, "status" : "Error in connecting to database"});
			return
		}
		
		if(data == null || data == undefined)
		{
			connection.query(MySql_SelectQuery,function(err,rows){
				connection.release();
				if(!err) {
					res.json(rows);
				}           
			});
		}
		else
		{
			connection.query(MySql_SelectOneQuery + "id= " + data,function(err,rows){
				connection.release();
				if(!err) {
					res.json(rows);
				}           
			});
		}
		
		connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in retrieving values"});
              return;
        });
	});
}

//Adding a new record to the database
function updateDataInTable(req,res)
{
	var data = req.body;
	pool.getConnection(function(err,connection){
		if(err)
		{
			res.json({"code" : 100, "status" : "Error in connecting to database"});
			return
		}
		
		connection.query(MySQL_UpdateQuery, data,function(err,rows){
			connection.release();
			if(!err) {
				showDataFromTable(req,res);
			}           
		});
	
		connection.on('error', function(err) {      
			  res.json({"code" : 100, "status" : "Error in retrieving values"});
			  return;
		});
	});
}

//Deleting a record from the database based on the Id
function deleteDataFromTable(req,res)
{
	var id  = req.query.id;
	pool.getConnection(function(err,connection){
		if(err)
		{
			res.json({"code" : 100, "status" : "Error in connecting to database"});
			return
		}
		
		connection.query(MySQL_DeleteQuery +id ,function(err,rows){
			connection.release();
			if(!err) {
				showDataFromTable(req,res);
			}           
		});
	
		connection.on('error', function(err) {      
			  res.json({"code" : 100, "status" : "Error in retrieving values"});
			  return;
		});
	});
}

//GET to retrieve all contacts
app.get('/GetAllContacts', function(req,res){
	console.log( "getting all contacts" );
	showDataFromTable(req,res);
});

//GET to retrieve contact details of Id specified
app.get('/GetSpecificContact', function(req,res){
	console.log( "getting specific contacts" );
	showDataFromTable(req,res);
});

//POST to add new contacts
app.post('/SaveContact', function(req,res){
	console.log("Saving data");
	updateDataInTable(req,res);
});

//GET to delete contact whose id is specified
app.get('/DeleteSpecificContact', function(req,res){
	
	console.log( "Deleting contact" );
	deleteDataFromTable(req,res);
	
});

//starting the server and listening at 8085
var server = app.listen(8085, 'localhost', function(){
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening to server at : http://%s:%s", host,port);
})
