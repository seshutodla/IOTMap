var netList = require('network-list');
var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');
var PORT = 3000;
var HOST = '172.20.10.2';
var dgram = require('dgram');
var dserver = dgram.createSocket('udp4');

var connection = mysql.createConnection({
/*
    Database information can be specified below
*/
    host: 'localhost',
    user: 'root',
    password: 'seshu149',
    database: 'deviceinfo'
});

var app = express();
var server = app.listen(4000,function(){
    console.log('listening')
})
app.use(express.static('public'));
dserver.on('listening', function(){
    var src = dserver.address();

})
var io = socket(server);
setInterval(function(){
	netList.scanEach({}, (err, obj) => {
		connection.query('select * from devices where DeviceID like ?', obj.mac, function(err, results, fields){
			if(results === undefined){
				console.log(results)
				console.log(obj)
				console.log('Not IOT')
			}
			else {
				if(results.length > 0){
					console.log(results)
					console.log(obj)
					console.log('Is IOT')
					console.log('----')
					var address = obj.ip;
					var dstat = obj.alive.toString('utf8');
					var dtype = results[0].DeviceType;
					var dname = results[0].DeviceName;
					var dmac = obj.mac;
					io.on('connection', function(socket){
						socket.emit('devicedisplay', {address, dstat, dtype, dname, dmac})
						dserver.on('message', function(message, remote)
						{
                           				var reading = message.toString('utf8');
                            				var receiver = dserver.address();
                            				var sender = remote.address();
                            				console.log(reading);
                            				socket.emit('tempread', {rd: reading, sender, receiver})
                        			})					
					})
				}
				else{
					console.log(obj)
				}
			}
		})
	})
}, 10000);
dserver.bind(PORT, HOST);
