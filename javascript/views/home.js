App.Views.Home = Backbone.View.extend({

    el: 'body',
    model: App.Models.PhotoModel,

    events: {
        'click .new-apod': 'onNewApodBtClick',
        'click .expand': 'onExpandBtClick',
        'click [data-about]': 'onAboutClick'
    },

    /**
     * View init
     */
    initialize: function() {
        var _this = this;

        this.isDescriptionVisible = false;
        this.isAboutVisible = false;
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
        this.apodSubView.toggleScrolling();
    },

    getNewApod: function() {
        // write IF for this removal
        if (this.isAboutVisible == true) {
            this.removeAboutView();
        }

        var _this = this;
        var $apod = $('.apod');

        this.removeApodView();
        this.renderApod();

        return this;
    },

    onNewApodBtClick: function() {
        var _this = this;

        var $newApodBtn = $('.new-apod');
        $newApodBtn.addClass('animate');
        setTimeout(function() {
            $newApodBtn.removeClass('animate');
        }, 400);

        this.randomApod.fetch({
            success: function() {
                _this.getNewApod();
            }
        });
    },

    removeApodView: function() {
        this.apodSubView.closeView();
    },

    removeAboutView: function() {
        this.aboutView.closeView();

        //Set isAboutVisible to false
        this.isAboutVisible = false;
    },

    onExpandBtClick: function() {
        this.isDescriptionVisible = this.isDescriptionVisible ? false : true;
    },

    onAboutClick: function(ev) {
        ev.preventDefault();
        this.renderAbout();
    },

    renderAbout: function() {
        if (this.isAboutVisible == false) {
            // Remove Apod
            this.removeApodView();

            // Render About view
            var $tempEl = $(document.createDocumentFragment());
            this.aboutView = new App.Views.Home.About();
            $tempEl.append(this.aboutView.render().el);

            // Append About view to .main-container
            this.$('.main-container').append($tempEl);

            //Set isAboutVisible to true
            this.isAboutVisible = true;
        } else {
            return false;
        }
    }

});
