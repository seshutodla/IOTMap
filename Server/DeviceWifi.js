var wifi = require('node-wifi');
var mysql = require('mysql');

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
    var id = 'b2:b0:ed:bc:05:80';
	connection.query('select * from devices where DeviceID like ?',id, function(err, result){
	console.log(result);
	if(result){
		console.log("This is an IOT device");
	} else {
		console.log("This is not an IOT device");
		}
	});
	/*connection.query('select * from devices', function(err, result){
		console.log(result);
	})*/
	connection.end();
});