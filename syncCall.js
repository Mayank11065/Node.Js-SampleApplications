//invoking async file read function to show non-blocking feature of Node.js

var fs = require('fs');

var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("Program ended");
