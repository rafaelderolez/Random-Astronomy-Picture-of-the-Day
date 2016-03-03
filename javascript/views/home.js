App.Views.Home = Backbone.View.extend({

    el: 'body',
    model: App.Models.PhotoModel,

    events: {
        "click .new-apod": "getNewApod",
    },
    /**
     * View init
     */
    initialize: function() {
        var _this = this;

        this.album = new App.Collections.PhotosCollection();
        this.album.fetch().done(this.render.bind(this));
    },

    render: function() {
        this.getOneApod();
    },

    getOneApod: function() {
        console.log('getOneApod');
        this.randomEl = _.sample(this.album.models);
        console.log(this.randomEl);

        this.renderRandomApod();
    },

    getNewApod: function() {
        var _this = this;
        $apod = $('.media');
        $apod.addClass('fadeout');

        setTimeout(function() {
            $apod.remove();
            _this.newRandomEl = _.sample(_this.album.models);
            console.log(_this.newRandomEl);

            var $tempElTwo = $(document.createDocumentFragment());

            var newView = new App.Views.PhotoItem({
                model: _this.newRandomEl
            });

            $tempElTwo.append(newView.render().el);

            _this.$('.main-container').append($tempElTwo);
        }, 0);

        return this;
    },

    renderRandomApod: function() {
        console.log('renderRandomApod');
        var $tempEl = $(document.createDocumentFragment());

        var view = new App.Views.PhotoItem({
            model: this.randomEl
        });

        $tempEl.append(view.render().el);

        this.$('.main-container').append($tempEl);

        return this;
    }

});
