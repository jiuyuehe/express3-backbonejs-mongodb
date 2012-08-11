var Thing = require('../models/things.js');

exports.list = function(req, res, next){
  Thing.find({}, function(err, things){
    if (err) return next(err);

    // https://gist.github.com/2859582
    var thingsData = things.map(function(d){
      d = d.toObject();
      d.id = d._id;
      delete d._id;
      return d;
    });

    console.log(thingsData);
    if (req.params.format === 'json') {
      console.log('sending JSON');
      res.send(thingsData);
    }
    else {
      res.render('things/list', {things: thingsData, data: JSON.stringify(thingsData)});
    }
  });
};

exports.create = function(req, res, next){
// Use this jquery snippet in console to test
/*
jQuery.post("/things", {
  "title": "awesome title",
  "body": "This is very interesting"
}, function (data, textStatus, jqXHR) {
  console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
});
*/
  console.log("CREATE: ");
  console.log(req.body);
  var thing = new Thing();
  thing.title = req.body.title;
  thing.body = req.body.body;
  thing.save(function(err) {
    if (err) return next(err);
    console.log('saved');
    res.send(thing);
  });
}

exports.read = function(req, res, next){
  console.log("READ: ");
  console.log(req.params.id);
  Thing.findById(req.params.id, function(err, thing){
    if (err) return next(err);
    thing = thing.toObject();
    thing.id = thing._id;


    if (req.params.format === 'json') {
      res.send(thing);
    }
    else {
      res.render('things/read', { title: 'Things', thing: thing});
    }

  });
}


// Updates using mongodb
// When using Schema.update, following not applied: defaults, setters, validators
// Use find and save to use the above
// http://mongoosejs.com/docs/updating-documents.html

exports.update = function(req, res, next){
// Use this jquery snippet in console to test
/*
jQuery.ajax({
    url: "/things/<id>",
    type: "PUT",
    data: {
      "title": "new title",
      "body": "new body",
    },
    success: function (data, textStatus, jqXHR) {
        console.log("Post resposne:");
        console.dir(data);
        console.log(textStatus);
        console.dir(jqXHR);
    }
});
*/

  console.log("UPDATE: ");
  Thing.findById(req.params.id, function(err, thing){
    if (err) return next(err);
    if (!thing) return next(err);
    thing.title = req.body.title;
    thing.body = req.body.body;
    thing.save(function(err) {
      if (err) return next(err);
      console.log('saved');
      res.render('things/read', { title: 'Things', thing: thing})
    });
  });
}

exports.updateBatch = function(req, res, next){
// Use this jquery snippet in console to test
/*
jQuery.ajax({
    url: "/things",
    type: "PUT",
    data: {
      "things" : [
        {"501863328d751feb4300002d" : {"title": "new title", "body": "new body"}}
      ]
    },
    success: function (data, textStatus, jqXHR) {
        console.log("Post resposne:");
        console.dir(data);
        console.log(textStatus);
        console.dir(jqXHR);
    }
});
*/
  var i, len = 0;
  console.log("is Array req.body.things");
  console.log(Array.isArray(req.body.things));
  console.log("UPDATE BATCH: (things)");
  console.log(req.body.things);
  if (Array.isArray(req.body.things)) {
    len = req.body.things.length;
  }
  var remaining = len;
  console.log(len);
  for (i = 0; i < len; i++) {
    console.log("UPDATE product by id:");
    for (var id in req.body.things[i]) {
      console.log(id);
      Thing.update({ "_id": id }, req.body.things[i][id], function (err) {
        if (err) return next(err);
        if (remaining === 0) {
          return res.send(req.body.things);
        }
        remaining -= 1;
      });
    }
  }
}

exports.delete = function(req, res, next){
// Use this jquery snippet in console to test
/*
jQuery.ajax({
    url: "/things/<id>",
    type: "DELETE",
    success: function (data, textStatus, jqXHR) {
        console.log("Post resposne:");
        console.dir(data);
        console.log(textStatus);
        console.dir(jqXHR);
    }
});
*/
  console.log("DELETE: ");
  Thing.remove({_id:req.params.id}, function(err, thing){
    if (err) return next(err);
    console.log(thing);
    if (thing) {
      console.log('deleted');
    }
    res.render('things/placeholder', { action: 'delete'});
  });
}

exports.deleteAll = function(req, res, next){
  console.log("DELETE ALL: ");
  Thing.remove({}, function(err, thing){
    console.log('xxx');
    if (err) return next(err);
    console.log('deleted');
    res.render('things/placeholder', { action: 'delete'});
  });
}
