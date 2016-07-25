//Simple Node.js application to show scaling of processes using child processes
var child_process = require('child_process');

//exec()
for(var i =0;i<3;i++)
{
	var workerThread = child_process.exec("node support.js " +i, function(error,stdout,stderr){
		if(error)
		{
			console.log(error.stack);
			console.log("Error Code: " + error.code);
			console.log("Signal Received: " + error.signal);
		}
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
	});
	
	workerThread.on('exit',function(code){
		console.log("Child Process exited with process id: " + code);
	});
}

//spawn()
for(var i =0;i<3;i++)
{
	var workerThread = child_process.spawn("node" ,["support.js", i]);
	
	workerThread.stdout.on('data',function(code){
		console.log("stdout: " + code);
	});
	
	workerThread.stderr.on('data',function(code){
		console.log("stderr: " + code);
	});
	workerThread.on('close',function(code){
		console.log("Child Process exited with process id: " + code);
	});
}

//fork()
for(var i=0; i<3; i++) {
   var workerThread = child_process.fork("support.js", [i]);	

   workerThread.on('close', function (code) {
      console.log('child process exited with code ' + code);
   });
}
