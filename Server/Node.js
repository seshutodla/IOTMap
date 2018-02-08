function Node(ip, mac) {
  this._ip = ip;
  this._mac = mac;
}

Node.prototype.getIP = function() {
  var self = this;

  return self._ip;
};

Node.prototype.getMAC = function() {
  var self = this;

  return self._mac;
};

Node.prototype.toJSON = function() {
  var self = this;
  var result = {
    ip: self._ip,
    mac: self._mac
  };

  return result;
};

Node.prototype.isAddressClassC = function() {
  var self = this;
  var result = false;
  var firstOctet = Number(self._mac);

  fs.readFile("fileLocation", function (err, data) {
    if (err) throw err;
    if(data.indexOf(firstOctet) >= 0){
      result = true;
    }
  })
  return result;
};

module.exports = Node;
