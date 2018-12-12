var express = require('express');
var app = express();
var net = require('net');
var dgram = require('dgram');

var HOST = '172.20.10.2'
var PORT = 3000;


var client = dgram.createSocket('udp4');
var client = new net.Socket();

//--Opening a connection with central computer
client.connect(PORT, HOST, function() {
    console.log('connected');
    
    //--Executing the python script to receive sensor data
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./TempTest.py']);
    
    //--Obtaining the output and storing it in a variable
    process.stdout.on('data', function(data){
        console.log(`${data}`);
        var rd = `${data}`;
        console.log(rd);
        })
        
    //--Sending the data    
    client.send(rd, 0, message.length, PORT, HOST, function(err,bytes) {
        if (err) {
            console.log('Error');
            }
    
});


