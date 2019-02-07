const netList = require('network-list');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'seshu149',
	database: 'DeviceInfo'
});
connection.connect();


netList.scanEach({ip: '172.20.10'}, (err, obj) => {
    //console.log(obj.mac); // device object
    	if(obj.mac == 'b8:27:eb:64:84:3c'){
    		if(obj.mac){
    			http.createServer(outLay).listen(8000);
    		}
    	else{
    		http.createServer(basicLay).listen(8000);
    	}
    }
  })


 function outLay(request, response) {
 	response.writeHead(200, {'Content-Type': 'text/html'});
 	fs.readFile('./outLay.html', null, function(error, data){
 		if(error) {
 			response.writeHead(404);
 			response.write('File not found!');
 		} else {
 			response.write(data);
 		}
 		response.end();
 	});
 }
function basicLay(request, response) {
 	response.writeHead(200, {'Content-Type': 'text/html'});
 	fs.readFile('./outIay.html', null, function(error, data){
 		if(error) {
 			response.writeHead(404);
 			response.write('File not found!');
 		} else {
 			response.write(data);
 		}
 		response.end();
 	});
 }

