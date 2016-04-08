App.Views.Home.About = Backbone.View.extend({

    tagName: 'div',

    className: 'box box--about',

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
        this.lazyLoadBackground();
        return this;
    },

    lazyLoadBackground: function() {
        setTimeout(function() {
            $('.lazy').lazyload({
                effect: 'fadeIn'
            });
        }, 1);
    },

    closeView: function() {
        this.remove();
    },
});
