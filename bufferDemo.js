//This file covers some of the buffer functions in Node.js
//Buffer class is a global class and hence module need not be imported
//var buf = require('buffer');

//Different ways to create buffer
var buf = new Buffer(10);
var len = buf.write("Hey there!");
console.log(buf.toString());
console.log("Octet written : " + len);

var buf = new Buffer([1,2,3,4,5,6,7]);
var len = buf.write("How are you?");
console.log(buf.toString());
console.log("Octet written : " + len);

var buf = new Buffer("Hello World");
console.log(buf.toString());
console.log("Octet written : " + buf.length);

//Default encoding is utf8
console.log( buf.toString('ascii',0,5));   
console.log( buf.toString('utf8',0,5)); 
console.log( buf.toString(undefined,0,5));


//Concatenate buffers
var buffer1 = new Buffer("Hello there! ");
var buffer2 = new Buffer("How are you?");

var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log(buffer3.toString());

//compare buffers - Comparison is case sensitive. Capital alphabets comes after small alphabets
var buffer1 = new Buffer("abc");
var buffer2 = new Buffer("ABC");

var result = buffer1.compare(buffer2);
if(result < 0)
	console.log(buffer1.toString() + " comes before " + buffer2.toString()); 
else if(result > 0)
	console.log(buffer2.toString() + " comes before " + buffer1.toString());
else
	console.log(buffer1.toString() + " is equal to " + buffer2.toString());

/*Here toString() is implicit because it is string concatenation. This would also have worked : 
* console.log(buffer1 + " is equal to " + buffer2)  -> abc is same as abc
*But not this :
* console.log(buffer1) -> Similar to this : <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
*/

//copy buffer
var buffer1 = new Buffer("ABC");
var buffer2 = new Buffer(3);

buffer1.copy(buffer2);
console.log("Buffer2's content : " + buffer2);

//Slice buffer - To get a sub-buffer
var buffer1 = new Buffer("Hello World!");
var buffer2 = buffer1.slice(0,5);
console.log("Buffer2's content : " + buffer2);

//buffer length
var buffer1 = new Buffer("Hello World!");
console.log(buffer1.length);
