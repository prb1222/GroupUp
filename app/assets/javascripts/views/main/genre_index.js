GameUp.Views.GenreIndex = Backbone.CompositeView.extend({
  template: JST['main/genre_index'],

  className: "genre-index-view",

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addGenreSubview);
    this.collection.each(function(genre){
      this.addGenreSubview(genre);
    }.bind(this));
    this.selectable = options.selectable;
  },

  render: function () {
    var content = this.template({genres: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    // translateX(calc((xW - 280px) / 2 - 6px))
    // Use the above CSS to move the genre items into place on render
    // xW = $('ul.genres-index').width()
    return this;
  },

  addGenreSubview: function (genre) {
    var genreItemView = new GameUp.Views.GenreItem({model: genre, selectable: this.selectable});
    this.addSubview('ul.genres-index', genreItemView);
    this.render();
  }
});
