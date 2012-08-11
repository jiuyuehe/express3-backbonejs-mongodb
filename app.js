// include dependencies
// http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application
var express = require('express')
  , http = require('http')
  // mongodb via mongoose
  , mongoose = require('mongoose')
  // configuration
  , conf = require('./app/conf.js')
  // error handling
  , error = require('./app/error.js')
  // route separation
  , routes = require('./routes');

// mongodb connection
mongoose.connect('mongodb://localhost/things');

// create an express app object
var app = express();

// add configuration
conf.boot(app, express);

// add error handling
error.handler(app, express);

// add routes
routes.define(app);

// start the express server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});