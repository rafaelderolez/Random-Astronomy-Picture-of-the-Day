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
        this.randomApod = new App.Models.PhotoModel();
        this.randomApod.fetch().done(this.fadeIn.bind(this));
    },

    fadeIn: function() {
        var $loader = $('.loader');
        $loader.addClass('loader--hidden');
        this.render();
    },

    render: function() {
        var $tempEl = $(document.createDocumentFragment());
        var view = new App.Views.ApodItem({
            model: this.randomApod,
            options: {
                descriptionVisible: this.isDescriptionVisible,
                parent: this
            }
        });

        $tempEl.append(view.render().el);
        this.$('.main-container').append($tempEl);
        view.viewDidRender();
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
