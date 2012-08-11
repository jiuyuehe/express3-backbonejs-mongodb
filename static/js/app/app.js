// Adapted from http://arturadib.com/hello-backbonejs/
// Load the application once the DOM is ready
$(function(){

// adapted from http://arturadib.com/hello-backbonejs/docs/3.html

  // extend the Backbone.Model prototype to build our own
  var Thing = Backbone.Model.extend({
    defaults : {
      title : 'title of thing',
      body : 'body content'
    },

    url : function() {
      // where to send the REST calls
      return this.id ? '/things/' + this.id : '/things';
    }
  });

  var Things = Backbone.Collection.extend({
    model : Thing,
    url : "/things.json"
  });

  var ThingsView = Backbone.View.extend({
    elDest: $('ul.things'),
    el: $('div#backboneThingsList'),
    events: {
      'click button#add': 'addThing'
    },

    initialize: function(){
      // every function that uses 'this' as the current object should be in here
      _.bindAll(this, 'render', 'addThing', 'appendThing');

      this.collection = new Things();
      this.collection.bind('add', this.appendThing); // collection event binder

      this.render();
    },

    render: function(){
      var self = this;
      $(this.el).append("<button id='add'>Add thing</button>");
      $(this.el).append("<ul></ul>");
    },

    addThing: function(){
      var thing = new Thing();
      this.collection.add(thing); // add thing to collection; view is updated via event 'add'
      thing.save(); // this will now POST to the RESTful interface.
    },

    appendThing: function(thing){
      $(this.elDest).prepend('<li><a href="/thing/'+thing.get('id')+'">'+thing.get('title')+'</a> '+thing.get('body')+'</li>');
    }
  });

  var thingsView = new ThingsView();

  /*
  // Commented out - shows adding a thing and fetching the things collection

  // Instantiating
  var glass = new Thing({
    // attributes passed to the Thing constructor will override the defaults
    title : 'Glass'
  });

  // Updating and retrieving attributes
  glass.set({ contents : 'beer' });

  // Saving
  glass.save();

  // Create a things collection
  var Things = Backbone.Collection.extend({
    model : Thing,
    url : "/things.json"
  });

  var things = new Things;
  // load local data added a page generation
  // performance gain over doing a fetch to server
  //things.reset(data);
  //console.log(things.at(0).get('title'));

  things.fetch({success: function(){
    //console.log(things.at(1).get('title'));
    things.each(function(thing) {
      //console.log(thing.get("title"));
    });
  }});
  */

});