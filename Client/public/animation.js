var result;
var socket = io.connect('http://localhost:4000')


socket.on('tempread', function(data){
	console.log(data.rd);
	var conn1 = draw.line(200,100,tempx+500,100).stroke({ width: 1})
	conn1.delay(40000).animate().stroke({width: 0})
	packet1.animate(5000).move(tempx+565,tempy+575)
		packet1.mouseover(function(){
		var d = new Date();
		alert('Packet Information\nSender: Temperature Device\nReceiver: CentralComputer\nData: '+data.rd+' deg C\nMessageTime: '+d)
		})
	packet1.attr({cx: 200, cy:100})
	})

		var d = new Date();
		var draw = SVG("create").size(1000,1000);
		var temps1 = draw.rect(70,50)
		var bmeimage = draw.image('https://www.modmypi.com/image/cache/catalog/rpi-products/breakout-boards/adafruit/2652/DSC_0644-1024x780.jpg',70,50)
		bmeimage.attr({x: 130, y: 75})
		temps1.attr({fill : 'white', 'fill-opacity': 0, stroke: 'black', 'stroke-width': 2})
		temps1.attr({ x: 130, y: 75})
		var tempx = temps1.x()
		var tempy = temps1.y()
		bmeimage.click(function(){

		alert('Device ID: b8:27:eb:64:84:3c\nDevice Name: Temperature Device')
		})



		var led = draw.rect(200,100)
		led.attr({fill: 'black','fill-opacity': 0, stroke: 'black', 'stroke-width': 2})
		led.attr({ x: tempx+500, y:tempy-25})
		var ledx = led.x()
		var ledy = led.y()
		var compimage = draw.image('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gnome-computer.svg/2000px-Gnome-computer.svg.png',200,100)
		compimage.attr({x: tempx+500, y:tempy-25})
		compimage.click(function(){
		alert('Device ID: 9c:b6:d0:03:db:a1\nDevice Name: CentralComputer')
		})

		//var conn1 = draw.line(200,100,tempx+500,100).stroke({ width: 1})
		var packet1 = draw.circle(10)
		packet1.attr({fill: 'red'})
		packet1.attr({cx: 200, cy:100})
			

		var temps2 = draw.rect(70,50)
		temps2.attr({fill: 'white','fill-opacity': 0, stroke: 'black', 'stroke-width': 2})
		temps2.attr({ x: 695, y: 650})
		var phoneimage = draw.image('https://cdn-shop.adafruit.com/1200x900/3527-02.jpg',70,50)
		phoneimage.attr({ x: 695, y: 650})
		var senx = temps2.x()
		var seny = temps2.y()
		phoneimage.click(function(){
		alert('Device ID: 85-24-81-87-61-3E\nDevice Name: LED')
		})
			
		var conn2 = draw.line(730,150,730,650).stroke({ width: 1})
