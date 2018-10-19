var wifi = require('node-wifi');
var mysql = require('mysql');
var fs = require('fs');
var http = require('http');

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
    if(currentConnections){
	    	var id1 = '24-5D-56-C1-38-B0';
			var id2 = '85-24-81-87-61-3E';
			connection.query('select * from devices where DeviceID like ?', id1, function(err, result){
			console.log(result);
			if(result){
				console.log("This is an IOT device");
			} else {
				console.log("This is not an IOT device");
			}
		})
			connection.query('select * from devices where DeviceId like ?', id2, function(err, result){
				console.log(result);
				if(result){
					console.log("This is an IOT device");
					http.createServer(outLay).listen(8000);
				} else {
					console.log("This is not an IOT device");
				}
		});
	} else{
			var id = '24-5D-56-C1-38-B0';
			connection.query('select * from devices where DeviceID like ?',id, function(err, result){
			console.log(result);
			if(result){
				console.log("This is an IOT device");
				http.createServer(layOut).listen(8000);
			} else {
				console.log("This is not an IOT device");
				}
			});		

	}

});

/*fs.readFile('C:/Users/Seshuprasad Todla/Desktop/TempReadings.txt', 'utf8', function(error, data) {
console.log(data);
});
 */

 function layOut(request, response) {
 	response.writeHead(200, {'Content-Type': 'text/html'});
 	fs.readFile('./FunctionTest.html', null, function(error, data){
 		if(error) {
 			response.writeHead(404);
 			response.write('File not found!');
 		} else {
 			response.write(data);
 		}
 		response.end();
 	});
 }

  function outLay(request, response) {
 	response.writeHead(200, {'Content-Type': 'text/html'});
 	fs.readFile('./OutTest.html', null, function(error, data){
 		if(error) {
 			response.writeHead(404);
 			response.write('File not found!');
 		} else {
 			response.write(data);
 		}
 		response.end();
 	});
 }

