//invoking async file read function to show non-blocking feature of Node.js

var fs = require('fs');

fs.readFile('input.txt',function(err,data){
		if(err) return console.error(err);
		console.log(data.toString());
});
console.log("Program ended");
