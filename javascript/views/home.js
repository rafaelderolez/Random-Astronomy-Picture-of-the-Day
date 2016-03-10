App.Views.Home = Backbone.View.extend({

    el: 'body',
    model: App.Models.PhotoModel,

    events: {
        'click .new-apod': 'onNewApodBtClick',
        'click .expand': 'onExpandBtClick'
    },

    /**
     * View init
     */
    initialize: function() {
        var _this = this;

        this.isDescriptionVisible = false;

        this.album = new App.Collections.PhotosCollection();
        this.album.fetch().done(this.render.bind(this));

        this.newApodBtn = $('.new-apod');
        this.apod = $('.apod');
    },

    render: function() {
        var $tempEl = $(document.createDocumentFragment());

        this.getOneApod();

        var view = new App.Views.PhotoItem({
            model: this.randomEl,
            options: {
                descriptionVisible: this.isDescriptionVisible
            }
        });

        $tempEl.append(view.render().el);

        this.$('.main-container').append($tempEl);

        view.viewDidRender();
    },

    getOneApod: function() {
        this.randomEl = _.sample(this.album.models);
    },

    getNewApod: function() {
        var _this = this;

        this.newApodBtn.addClass('animate');
        setTimeout(function() {
            _this.newApodBtn.removeClass('animate');
        }, 400);
        this.apod = $('.apod');
        this.apod.addClass('fadeout');

        setTimeout(function() {
            _this.apod.remove();
            _this.render();
        }, 400);

        return this;
    },

    onNewApodBtClick: function() {
        this.getNewApod();
    },
    onExpandBtClick: function() {
        this.isDescriptionVisible = this.isDescriptionVisible ? false : true;
    },

});
