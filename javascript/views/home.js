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
        var $tempEl = $(document.createDocumentFragment());

        this.getOneApod();
        this.apodLinkRegex();

        var view = new App.Views.PhotoItem({
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

    apodLinkRegex: function() {
        var preRegexText = this.randomEl.attributes.text;
        var postRegexText = preRegexText.replace(/a href=\"ap[0-9]{6}/, function(match) {
            return match.replace(/=\"/, '="http://apod.nasa.gov/apod/')
        });
        this.randomEl.set('text', postRegexText);
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

        setTimeout(function() {
            $apod.remove();
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
