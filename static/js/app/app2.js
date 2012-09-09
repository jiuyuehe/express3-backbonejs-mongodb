// Adpated from http://pixelhandler.com/blog/2012/02/29/backbone-js-models-views-collections-to-present-api-data/
// Load the application once the DOM is ready
$(function(){

  // SA namespace Sample App
  SA = window.SA || {};

  // model
  SA.Thing = Backbone.Model.extend({
      defaults : {
        title : 'title of thing',
        body : 'body content'
      },

      url : function() {
        // where to send the REST calls
        return this.id ? '/things/' + this.id : '/things';
      }
  });

  // application
  SA.App = Backbone.Router.extend({
    routes: {
        "add" : "addThing",
        "things": "listThings"
    },
    initialize: function (options) {
      var thingsList = new SA.ThingsListView({
        "container": $('#backboneThingsList'),
        "collection": SA.things
      });
      SA.things.deferred.done(function () {
        thingsList.render();
      });

    },
    //initialize: function (options) {},
    listThings: function () {
      console.log('list things');
    },
    addThing: function(){
      console.log('add thing');
      var thing = new SA.Thing();
      thing.save(); // this will now POST to the RESTful interface.
    }
  });

  SA.ThingsListView = Backbone.View.extend({
    tagName: "ul",
    className: "things",
    initialize: function(){
      _.bindAll(this, 'render');
      this.collection.bind('add', this.renderThing);
    },
    render: function () {
      for (var i = 0; i < this.collection.length; i++) {
        this.renderThing(this.collection.models[i]);
      };
      $(this.container).find(this.className).remove();
      this.$el.appendTo(this.options.container);
      return this;
    },
    renderThing: function (model) {
      var item = new SA.ThingsListItemView({
        "model": model
      });
      item.render().$el.appendTo(this.$el);
    }
  });

  SA.ThingsListItemView = Backbone.View.extend({
    tagName: "li",
    //className: "thing",
    initialize: function (options) {
      this.template = $('#thing-template').html();
    },
    render: function () {
      var markup = Mustache.to_html(this.template, this.model.toJSON());
      this.$el.html(markup).attr('id',this.model.get('_id'));
      return this;
    }
  });

  SA.ThingsList = Backbone.Collection.extend({
    model: SA.Thing,
    url: '/things.json',
    // BELOW NOT REQUIRED, USE backbone events
    initialize: function () {
      this.fetch({
        success: this.fetchSuccess,
        error: this.fetchError
      });
      this.deferred = new $.Deferred();
    },
    deferred: Function.constructor.prototype,
    fetchSuccess: function (collection, response) {
      collection.deferred.resolve();
    },
    fetchError: function (collection, response) {
      throw new Error("Things fetch did get collection from API");
    }
  });
  SA.things = new SA.ThingsList();


  SA.app = new SA.App();
  // http://stackoverflow.com/questions/6977017/backbone-js-url-routing
  Backbone.history.start({pushState: false, root: "/things/"})

});