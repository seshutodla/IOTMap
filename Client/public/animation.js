var socket = io.connect('http://localhost:4000')
var draw = SVG("create").size(1000,1000);
var nested1 = draw.nested();
var nested2 = draw.nested();
var nested3 = draw.nested();
var central = draw.rect(200,100);
var image = draw.image();
central.attr({fill: 'black', 'fill-opacity': 0, stroke: 'black', 'stroke-width': 2})
central.attr({ x: 630, y: 50})
var centx = central.x()
var centy = central.y()
var compimage = draw.image('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gnome-computer.svg/2000px-Gnome-computer.svg.png', 200,100)
compimage.attr({x: centx, y: centy})
compimage.click(function(){
	alert('Device ID: 48:d2:24:d1:ff:a2\nDevice Name: CentralComputer')
})

socket.on('devicedisplay', function(data){
	console.log(data.address)
	console.log(data.dstat)
	console.log(data.mac)
	console.log(data.name)
	console.log(data.dtype)
	if(data.dstat == 'true'){
		var temps1 = nested1.rect(70,50)
		temps1.attr({fill: 'white', 'fill-opacity': 0, stroke:'black', 'stroke-width': 2})
		if (data.dtype == 'Sensor'){
			image = nested1.image('https://www.modmypi.com/image/cache/catalog/rpi-products/breakout-boards/adafruit/2652/DSC_0644-1024x780.jpg', 70, 50)		
		}
		if (data.dtype == 'Display'){
			image = nested2.image('https://cdn-shop.adafruit.com/1200x900/3527-02.jpg', 70,50)	
		}
		image.click(function(){
			alert('Device ID: '+data.mac+'\nDevice Name: '+data.name)
		})
	}
	else{
		nested1.clear()
	}
})

socket.on('packetSend', function(data){
	var conn = nested2.line().stroke({width: 1})
	var packet = nested3.circle(10)
	packet.attr({fill: 'red'})
	packet.animate(5000).move(data.xcor, data.ycor)
	packet.mouseover(function(){
		var d = new Date();
		alert('Packet Information\nSender: '+data.sender+'\nReceived: '+data.receiver+'\nData: '+data.rd+'\nMessage Time: '+d)
	})
})
