App.Views.PhotoItem = Backbone.View.extend({

    tagName: 'div',

    className: 'apod',

    templateEl: $('#tplApod'),

    template: function(attributes) {
        return _.template(this.templateEl.html())(attributes);
    },

    /**
     * View init
     */
    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

});
