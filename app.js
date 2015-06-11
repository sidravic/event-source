var Hapi = require('hapi')
var server = new Hapi.Server();
var Path = require('path');
server.connection({port: 8006});




server.start(function(){
   	console.log("Server started on port 8006");    
});