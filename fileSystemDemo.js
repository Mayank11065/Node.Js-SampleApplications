//This file contains some of the functions of file system module in node.js

var fs = require('fs');

/**
Reading a file in different modes
**/
/*
//Asynchronously reading a file
fs.readFile('input.txt', function(err,data){
	if(err)
		return console.error("Error in reading the file : " + err);
	
	console.log("Asynchronous Read : " + data.toString());
});

//Synchronously reading a file
var data = fs.readFileSync('input.txt');

console.log("Synchronously read data : " + data.toString());
console.log("End of File read");
*/
/**
Opening a file in asynchronous mode
**/
/*
console.log("Opening a file asynchronously");
fs.open('input.txt', 'r+', function(err,data){
	if(err)
		return console.error(err);
	console.log("File opened successfully");
});
*/

/**
File system information
**/
/*
console.log("Retreiving file info");
fs.stat('input.txt',function(err,stats){
	if(err)
		return console.log(err);
	
	console.log(stats);
	
	//Checking othe properties - File type
	console.log("is File? : " + stats.isFile());
	console.log("is directory? : " + stats.isDirectory());
	
});
*/
/**
Writing to a file
**/

console.log("Writing into an existing file");
fs.writeFile('input.txt','Simple Easy Learning', function(err){
	if(err)
		return console.log(err);
	console.log("Successfully written data");
	console.log("Reading new Data");
	fs.readFile('input.txt', function(err,data){
		if(err)
			return console.log(err);
		console.log("New Data is: ");
		console.log(data.toString());
	})
})