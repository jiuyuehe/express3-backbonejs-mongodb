// configuration
exports.boot = function(app, express){

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    // parse json request bodies (as well as others), and place the result in req.body
    app.use(express.bodyParser());
    // allow altering of alter the HTTP method
    // http://expressjs.com/guide.html#http-methods
    app.use(express.methodOverride());
    // use a router
    app.use(app.router);
    // specify directory for static files
    // when proxied from nginx, this is not used
    app.use('/static', express.static(__dirname + '/../static'));
  });

}