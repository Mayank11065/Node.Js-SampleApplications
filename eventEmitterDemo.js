//This file covers some of the event Emitter functions in Node.js

//Importing event module
var events = require('events');
//Creating event emitter
var eventEmitter = new events.EventEmitter();

//Creating two listeners
var listener1 = function listener1()
{
	console.log("listener1 triggered");
}

var listener2 = function listener2()
{
	console.log("listener2 triggered");
}

//Binding listeners to an event with two different ways - on , addListener
eventEmitter.on('connection',listener1);
eventEmitter.addListener('connection',listener2);

//Counting the number of listeners
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");

//Firing the events
eventEmitter.emit('connection');

//Removing one listener. Now only listener2 would listen
eventEmitter.removeListener('connection',listener1);
console.log('Now only listener2 would listen');

//Firing the event again
eventEmitter.emit('connection');

//Counting the number of listeners now
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");
