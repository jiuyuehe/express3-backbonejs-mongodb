// route separation
// https://github.com/visionmedia/express/tree/master/examples/route-separation
// http://stackoverflow.com/questions/11493849/moving-route-logic-out-of-app-js
var home = require('./home')
  , things = require('./things');

exports.define = function(app) {
  // http://clientexpressjs.com/examples/routing

  // home
  app.get('/', home.index);

  // things
  // list
  app.get('/things.:format?', things.list);
  // read
  app.get('/things/:id?.:format?', things.read);
  // create
  app.post('/things', things.create);
  // bulk update
  app.put('/things', things.update);
  // update
  app.put('/things/:id?', things.update);
  // delete all things
  app.del('/things', things.deleteAll);
  // delete single thing
  app.del('/things/:id?', things.delete);

}