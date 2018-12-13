var wifi = require('node-wifi');
var mysql = require('mysql');
var fs = require('fs');
var http = require('http');
var dgram = require('dgram');

var PORT = 3000;
var HOST = '172.20.10.2';
var server = dgram.createSocket('udp4');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'seshu149',
	database: 'DeviceInfo'
});
connection.connect();

wifi.init({
    iface : null 
});

//--Getting list of neighboring devices in network
wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    }
    http.createServer(outLay).listen(8000);
    //--Checking each device
    currentConnections.forEach(function(currentConnections.mac()){
    	var id1 = currentConnections.mac();
    	connection.query('select * from devices where DeviceID like ?', id1, function(err, result){
			console.log(result);
			if(result){
				console.log("This is an IOT device");
				//--Obtaining device name
				connection.query('select DeviceName from devices where DeviceID like ?', id1, function(err, result){
					var name = result;
				});
				//--Obtaining device type
				connection.query('select DeviceType from devices where DeviceID like ?', id1, function(err,result){
					var type = result;
				});
				//--Obtaining data sent by device
				server.bind(PORT, HOST);

				server.on('listening', function() {
					var rec = server.address();
				})

				server.on('message', function(message, remote) {
					var iotdata = message;
				});
				//--Passing data into function to be generated using shapeGen script
				http.createServer(outLay(iotdata, type, id1, name, rec));

			} else {
				console.log("This is not an IOT device");
			}
		});
    });
});

function outLay(iotdata, type, id, name, rec){
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./DisplayMap.html', null, function(error, data){
 		if(error) {
 			response.writeHead(404);
 			response.write('File not found!');
 		} else {
 			response.write(data);
 		}
 		response.end();
 	});
}
