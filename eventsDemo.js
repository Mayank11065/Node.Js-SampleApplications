//simple application to show how events work in Node.js
//Importing events module
var events = require('events');

//creating an EventEmitter object
var eventEmitter = new events.EventEmitter();

//eventEmitter's event which is fired whenever any new event is registered.
eventEmitter.on('newListener',function(){
	console.log('event added');
});

//creating a callback function to be called when the event it is registered to occurs
var eventHandler = function()
{
	console.log('data_changed');
	//Firing an event
	eventEmitter.emit('change_accepted');
}

//bind the data_changed event to callback function defined previously
eventEmitter.on('data_changed',eventHandler);

//Binding another event - change_accepted to the anonymous function
eventEmitter.on('change_accepted', function(){
		console.log('change_accepted');
});

//Firing an event
eventEmitter.emit('data_changed');
