App.Views.Home.ApodItem = Backbone.View.extend({

    tagName: 'div',

    className: 'box box--apod',

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
        this.parent = datas.options.parent;
        $(window).on('resize', this.toggleScrolling);
    },

    expandApodDescription: function(ev) {
        var _this = this;

        this.isExpanded = this.parent.isDescriptionVisible;

        var $expand = $(ev.currentTarget);
        var $readMore = $('.box__read-more');

        $expand.toggleClass('expand--active');

        if (this.isExpanded == true) {
            TweenMax.to($readMore, 0.4, {
                height: 0,
                ease: Sine.easeInOut,

                onCompleteScope: this,
                onComplete: function() {
                    this.toggleScrolling();
                },
            });
        } else {
            TweenMax.set($readMore, {
                height: 'auto',

                onCompleteScope: this,
                onComplete: function() {
                    this.toggleScrolling();
                },
            });
            TweenMax.from($readMore, 0.4, {
                height: 0,
                ease: Sine.easeInOut
            });
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
        $('.lazy').lazyload({
            effect: 'fadeIn'
        });

        this.wrapMatrixCharacters();
        this.matrixFade();
    },

    toggleScrolling: function() {
        var $box = $('.box__content');
        var boxMargin = 20;
        var $boxHeight = $('.box__content').outerHeight();
        var $footerHeight = $('footer').outerHeight();
        var $windowHeight = $(window).height();
        if ($windowHeight - boxMargin - $footerHeight <= $boxHeight) {
            $box.addClass('box__content--scroll');
        } else {
            $box.removeClass('box__content--scroll');
        }
    },

    closeView: function() {
        $(window).off('resize', this.toggleScrolling);
        this.remove();
    },
});
