var netList = require('network-list');
var mysql = require('mysql');
var fs = require('fs');
var http = require('http');
var PORT = 3000;
var HOST = '172.20.10.2';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

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

server.on('listening', function () {
	var address = server.address();
	console.log('Listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
	var reading = message.toString('utf8');
	console.log(message.toString('utf8'));
	fs.writeFile("./tempreading.txt", reading , function(err){
		if(err){
			return console.log(err);
		}
	//console.log("saved")
	})
});
server.bind(PORT, HOST);

http.createServer(outLay).listen(8000);
function outLay(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./layoutTest.html', null, function(error, data){
		if(error){
			response.writeHead(404);
			response.write('File not found!');
		} else {
			response.write(data);
		}
		response.end();
	});
}
