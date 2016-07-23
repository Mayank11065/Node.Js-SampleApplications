//This file shows programms using global object in node.js
console.log(__filename);
console.log(__dirname);

function printHello()
{
	console.log("Hello World!");
}
var t = setTimeout(printHello,2000);
clearTimeout(t);

var interval = setInterval(printHello,2000);
clearTimeout(interval);