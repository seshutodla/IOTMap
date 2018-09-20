var wifi = require('node-wifi');
var mysql = require('mysql');
var fs = require('fs');

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
 
 
wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    }
	console.log("List of current connections: ")
    console.log(currentConnections);
    var id = '24-5D-56-C1-38-B0';
	connection.query('select * from devices where DeviceID like ?',id, function(err, result){
	console.log(result);
	if(result){
		console.log("This is an IOT device");
	} else {
		console.log("This is not an IOT device");
		}
	});
	connection.query('select * from devices', function(err, result){
		console.log(result);
	})	
});

fs.readFile('C:/Users/Seshuprasad Todla/Desktop/TempReadings.txt', 'utf8', function(error, data) {
console.log(data);
});
