App.Views.Home.About = Backbone.View.extend({

    tagName: 'div',

    className: 'about',

    templateEl: $('#tplAbout'),

    events: {
        // 'click .expand': 'expandApodDescription'
    },

    template: function(attributes) {
        return _.template(this.templateEl.html());
    },

    /**
     * View init
     */
    initialize: function() {},

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    closeView: function() {
        this.remove();
    },
});
