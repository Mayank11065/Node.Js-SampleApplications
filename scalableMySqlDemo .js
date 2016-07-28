//This file shows a scalable way to use Mysql along with Node.js in production like setup
//Package to be downloaded : node-mysql
//Reference  : https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/
//I have used the properties of my Mysql. Please modify to appropriate values to use this file.
var MySQL_host = "localhost";
var MySQL_username = "testUser";
var MySQL_password = "password";
var MySQL_db = "test";
var MySQl_table = "DummyTable";
var MySQl_conn_limit = 100;

var mysql = require('mysql');
var express = require('express');

var app = express();

//Assumes port be default - 3306
var pool = mysql.createPool({
	connectionLimit : MySQl_conn_limit,
	host : MySQL_host,
	user : MySQL_username,
	password : MySQL_password,
	database : MySQL_db,
	debug : false
});

function handleDatabaseRequest(req,res)
{
	pool.getConnection(function(err,connection){
		if(err)
		{
			res.json({"code" : 100, "status" : "Error in connecting to database"});
			return
		}
		
		console.log("connected as id : " + connection.threadId);
		connection.query("select * from " + MySQl_table,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });
		
		connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in retrieving values"});
              return;     
        });
	});
}

app.get("/",function(req,res){
        handleDatabaseRequest(req,res);
});

var server = app.listen(8085,'localhost', function(){
	
	var host = server.address().address
	var port = server.address().port
	
	console.log("Server listening at http://%s:%s",host,port);
});

