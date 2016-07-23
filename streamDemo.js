//this file contains some example of Streams in node.js
var fs = require('fs');
var data = '';

/**
* Reading from a stream
**/

//Create a reader stream
var readerStream = fs.createReadStream('input.txt');

//Set encoding to UTF8
readerStream.setEncoding('UTF8');

//Handle stream events - data, end, error
readerStream.on('data',function(chunk){
	data += chunk;
});

readerStream.on('end',function(){
	console.log("File Reading Completed");
	console.log("File Data : \n" + data);
});

readerStream.on('error',function(err){
	console.log(err.toString());
});
console.log("End of Reader Program");

/**
* Writing to a stream
**/

var writeData = 'This is a file writing example using write streams';

//Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

//Write data to stream with encoding as UTF8
writerStream.write(writeData,'UTF8');

writerStream.end();

//Binding events to write stream -> finish, error
writerStream.on('finish',function(){
	console.log("File Write successfull");
});

writerStream.on('error',function(err){
	console.log(err.toString());
});

console.log("Writer Program Ended");


/**
* Piping Stream example
**/

//Create a reader stream
var readerStream = fs.createReadStream('input.txt');

//Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

readerStream.pipe(writerStream);
console.log("Pipe Program Ended");

/**
* Chining example
**/

var zlib = require('zlib');

//Compress input.txt to input.txt.gz
fs.createReadStream('input.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('input.txt.gz'));

console.log('File Compressed');


//Decompress the zip file to text file
fs.createReadStream('input.txt.gz')
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream('output.txt'));
	
console.log('File Decompressed \nChaining Program ended');

