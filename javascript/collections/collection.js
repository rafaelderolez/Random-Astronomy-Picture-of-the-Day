/*global App, Backbone*/

(function() {
    'use strict';

    App.Collections.PhotosCollection = Backbone.Collection.extend({

        model: App.Models.PhotoModel,
        url: 'https://raw.githubusercontent.com/slowe/apod/master/apod.json',

        initialize: function() {

        },

        parse: function(response, options) {
            return response.apod;
        }

    });

})();
