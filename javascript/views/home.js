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
    },

    fadeIn: function() {
        var $loader = $('.loader');
        $loader.addClass('loader--hidden');

    },

    render: function() {
        this.randomApod = new App.Models.PhotoModel();
        this.randomApod.fetch().done(
            this.fadeIn.bind(this),
            this.renderApod.bind(this)
        );
    },

    renderApod: function() {
        var $tempEl = $(document.createDocumentFragment());
        this.apodSubView = new App.Views.Home.ApodItem({
            model: this.randomApod,
            options: {
                descriptionVisible: this.isDescriptionVisible,
                parent: this
            }
        });

        $tempEl.append(this.apodSubView.render().el);
        this.$('.main-container').append($tempEl);
        this.apodSubView.viewDidRender();
    },

    getNewApod: function() {
        var _this = this;
        var $newApodBtn = $('.new-apod');
        var $apod = $('.apod');

        $newApodBtn.addClass('animate');
        setTimeout(function() {
            $newApodBtn.removeClass('animate');
        }, 400);

        this.apodSubView.remove();
        this.renderApod();

        return this;
    },

    onNewApodBtClick: function() {
        var _this = this;
        this.randomApod.fetch({
            success: function() {
                _this.getNewApod();
            }
        });
    },

    onExpandBtClick: function() {
        this.isDescriptionVisible = this.isDescriptionVisible ? false : true;
    },

});
