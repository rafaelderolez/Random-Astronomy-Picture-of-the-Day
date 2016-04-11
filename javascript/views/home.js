App.Views.Home = Backbone.View.extend({

    el: 'body',

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
        this.hasRenderedApod = false;
    },

    render: function() {
        this.randomApod = new App.Models.ApodModel();
        this.fetchApod();
    },

    fetchApod: function() {
        var _this = this;
        this.randomApod.fetch({
            success: function() {
                _this.preRenderCheck();
            },
            error: function() {
                setTimeout(function() {
                    _this.fetchApod();
                }, 1);
            }
        });
    },

    preRenderCheck: function() {
        if (this.isAboutVisible == true) {
            this.removeAboutView();
        } else if (this.hasRenderedApod == true) {
            this.removeApodView();
        };

        this.renderApod();
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

        this.hasRenderedApod = true;
    },

    onNewApodBtClick: function() {
        var _this = this;

        var $newApodBtn = $('.new-apod');
        $newApodBtn.addClass('animate');
        setTimeout(function() {
            $newApodBtn.removeClass('animate');
        }, 1000);

        this.fetchApod();
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
