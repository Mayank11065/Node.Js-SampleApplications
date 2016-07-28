//This file shows a simple use of mysql driver in Node.js to connect to the MySQL DB
//Package to be downloaded : node-mysql
//Reference  : https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/
//NOTE : This is not a production scalable way to use MySQL. Refer to the URL to use Conenction Pool to use MySql in production
//I have used the properties of my Mysql. Please modify to appropriate values to use this file.
var MySQL_host = "localhost";
var MySQL_username = "testUser";
var MySQL_password = "password";
var MySQL_db = "test";
var MySQl_table = "DummyTable";

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : MySQL_host,
	user : MySQL_username,
	password : MySQL_password,
	database : MySQL_db
});
//conenct to the databse
connection.connect();
//show query result
connection.query("select * from " + MySQl_table, function(err, rows, fields){
	if(!err)
	{
		console.log("Query Result : ");
		for(var i=0; i < rows.length; i++)
		{
			console.log("User : " + i);
			var entry = rows[i];
			for (var j =0;j < fields.length;j++)
			{
				field  =fields[j].name;
				console.log(field + " : " + entry[field]);
			}
				
		}
	}
	else
	{
		console.log("Error retrieving values. Error : "+ err);
	}
});

connection.end();
