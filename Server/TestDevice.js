var express = require('express')
var socket = require('socket.io')

var PORT = 3000;
var HOST = '172.20.10.2';
var dgram = require('dgram');
var dserver = dgram.createSocket('udp4');

var netList = require('network-list');
var mysql = require('mysql');

var app = express();
var server = app.listen(4000,function(){
	console.log('listening')
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'seshu149',
	database: 'deviceinfo'
});

netList.scanEach({}, (err, obj) => {
	if(obj.alive == true)
	{
		if(obj.mac)
		{
	    	connection.query('select * from devices where DeviceID like ?', obj.mac, function(err,result){
	    		console.log(result);
		    	if(result.length > 0){
		    		console.log('Is IOT');
		    		console.log(obj);
		    		console.log('----')
		    	}
		    	else{
		    		console.log('Not IOT');
		    		console.log(obj);
		    		console.log('---')
		    	}
	    	})
    	}
	}
});

app.use(express.static('public'));

var io = socket(server);
dserver.on('listening', function () {
	var address = dserver.address();
	console.log('Listening on ' + address.address + ':' + address.port);
});


io.on('connection', function(socket){
	dserver.on('message', function(message, remote) {
		var reading = message.toString('utf8');
		console.log(message.toString('utf8'));
		//console.log('made socket')
		socket.emit('tempread', {rd: reading})

	});
});		
	//console.log("saved")

dserver.bind(PORT, HOST);
