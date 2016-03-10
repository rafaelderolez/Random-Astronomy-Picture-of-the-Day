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

        this.newApodBtn = $('.new-apod');
        this.apod = $('.apod');
    },

    render: function() {
        this.getOneApod();
        this.wrapMatrixCharacters();
        setTimeout(_.bind(this.matrixFade, this), 1000);
    },

    getOneApod: function() {
        this.randomEl = _.sample(this.album.models);
        this.renderRandomApod();
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
            _this.newRandomEl = _.sample(_this.album.models);

            var $tempElTwo = $(document.createDocumentFragment());

            var newView = new App.Views.PhotoItem({
                model: _this.newRandomEl
            });

            $tempElTwo.append(newView.render().el);

            _this.$('.main-container').append($tempElTwo);
            _this.wrapMatrixCharacters();
            _this.matrixFade();
        }, 400);



        return this;
    },

    renderRandomApod: function() {
        var $tempEl = $(document.createDocumentFragment());

        var view = new App.Views.PhotoItem({
            model: this.randomEl
        });

        $tempEl.append(view.render().el);

        this.$('.main-container').append($tempEl);

        return this;
    },

    wrapMatrixCharacters: function() {
        var $glitch = $('.glitch');

        $glitch.each(function(index) {
            var $this = $(this);
            var character = $(this).text().split('');

            $this.empty();
            $.each(character, function(i, v) {
                $this.append($('<span>').text(v));
            });
        });
    },
    matrixFade: function() {
        var $glitch = $('.glitch');
        var $glitchCharacter = $glitch.find('span');
        var interval = setInterval(function() {
            var $ds = $glitchCharacter.not(".active");
            $ds.eq(Math.floor(Math.random() * $ds.length)).addClass('active');
            if ($ds.length == 1) {
                clearInterval(interval);
            }
        }, 5);
    }

});
