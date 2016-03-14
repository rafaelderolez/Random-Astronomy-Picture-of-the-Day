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
        this.album.fetch().done(this.fadeIn.bind(this));
    },

    fadeIn: function() {
        var $loader = $('.loader');
        $loader.addClass('loader--hidden');
        this.render();
    },

    render: function() {
        this.getOneApod();

        var $tempEl = $(document.createDocumentFragment());
        var view = new App.Views.ApodItem({
            model: this.randomEl,
            options: {
                descriptionVisible: this.isDescriptionVisible,
                parent: this
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
        var $newApodBtn = $('.new-apod');
        var $apod = $('.apod');

        $newApodBtn.addClass('animate');
        setTimeout(function() {
            $newApodBtn.removeClass('animate');
        }, 400);

        $apod.addClass('fadeout');
        $apod.remove();

        _this.render();

        return this;
    },

    onNewApodBtClick: function() {
        this.album.fetch().done(this.getNewApod.bind(this));
    },

    onExpandBtClick: function() {
        this.isDescriptionVisible = this.isDescriptionVisible ? false : true;
    },


});
