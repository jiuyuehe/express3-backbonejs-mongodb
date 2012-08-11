exports.handler = function(app, express){

  // in development mode, use express error handler
  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  // in all other modes handle any errors here
  app.use(function(err, req, res, next){
    // if an error occurs Connect will pass it down
    // through these "error-handling" middleware
    // allowing you to respond however you like
    // http://stackoverflow.com/questions/7151487/error-handling-principles-for-nodejs-express-apps
    // https://github.com/visionmedia/express/issues/751
    // inside middleware, reached via: if (err) return next(err);
    // inside app, reached via: throw new Error('keyboard cat!');
    res.send(500, { error: 'Sorry something bad happened!' });
  })

}