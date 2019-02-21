var netList = require('network-list');
var mysql = require('mysql');
var fs = require('fs');
var http = require('http');

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
