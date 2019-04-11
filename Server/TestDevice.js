var netList = require('network-list');
var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');
var PORT = 3000;
var HOST = '172.20.10.2';
var dgram = require('dgram');
var dserver = dgram.createSocket('udp4');

var connection = mysql.createConnection({
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
        if(obj.ip == '172.20.10.6' || obj.ip == '172.20.10.7')
        {
            
                connection.query('select * from devices where DeviceID like ?', obj.mac, function(err,results,fields){
                    console.log(results)
                        io.on('connection', function(socket){
                            var address = obj.ip;
                            var dstat = obj.alive.toString('utf8');
                            var mac = obj.mac;
                            connection.query('select DeviceName from devices where DeviceID like ?', obj.mac, function(err,results){
                            	var name = results;
                            })
                            connection.query('select DeviceType from devices where DeviceID like ?', obj.mac, function(err,results){
                            	var dtype = results;
                            })
                            var dtype = results.DeviceType;
                            socket.emit('devicedisplay', {address, dstat, mac, name, dtype})
                            dserver.on('message', function(message, remote){
                                var reading = message.toString('utf8');
                                var receiver = dserver.address();
                                var sender = remote.address();
                                console.log(reading);
                                socket.emit('tempread', {rd: reading, sender, receiver})
                            })
                        })
                        console.log('Is IOT');
                        console.log(obj);
                        console.log('----')
                    

                })
        }
    });
}, 10000);
dserver.bind(PORT, HOST);
