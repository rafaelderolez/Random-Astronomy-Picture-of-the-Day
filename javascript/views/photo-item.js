App.Views.PhotoItem = Backbone.View.extend({

    tagName: 'div',

    className: 'apod',

    templateEl: $('#tplApod'),

    events: {
        'click .expand': 'expandApodDescription'
    },

    template: function(attributes) {
        return _.template(this.templateEl.html())(attributes);
    },

    /**
     * View init
     */
    initialize: function(datas) {
        this.options = datas.options;
        console.log(this.options)
    },

    expandApodDescription: function(ev) {
        var $expand = $(ev.currentTarget);
        var $readMore = $('.apod__read-more');
        $expand.toggleClass('expand--active');

        if ($readMore.is(':visible')) {
            $readMore.fadeOut('slow');
        } else {
            $readMore.fadeIn('slow');
        }

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
            var $ds = $glitchCharacter.not('.active');
            $ds.eq(Math.floor(Math.random() * $ds.length)).addClass('active');
            if ($ds.length == 1) {
                clearInterval(interval);
            }
        }, 5);
    },

    render: function() {
        this.$el.html(this.template({
            model: this.model.attributes,
            options: this.options
        }));

        return this;
    },

    viewDidRender: function() {
        this.wrapMatrixCharacters();
        this.matrixFade();
    }

});
