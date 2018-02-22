var wifi = require('node-wifi');
 

wifi.init({
    iface : null 
});
 
// Scan networks
wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        console.log(networks);
        
    }
});
 

 

wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    }
    console.log(currentConnections);
    
});
 

wifi.scan().then(function (networks) {
  // networks
}).catch(function (error) {
  // error
})