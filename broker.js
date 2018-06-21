var mosca = require('mosca');
var settings = {
		port:8080
};

var server = new mosca.Server(settings);

server.on('ready', function(){
console.log(".........PORTAL IoT Starting OK......");
var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
         console.log(alias.address);
    }
  }

});

// fired whena  client is connected
server.on('clientConnected', function(client) {
  console.log('message from server == client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('message from server == Published : ', packet.payload.toString());
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('message from server == subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('message from server == unsubscribed : ', topic);
 });

// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('message from server == clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('message from server == clientDisconnected : ', client.id);
});