/*global App, Backbone*/

App.Models = App.Models || {};

(function() {
    'use strict';

    App.Models.PhotoModel = Backbone.Model.extend({
        urlBase: 'https://api.nasa.gov/planetary/apod?date=',
        urlApiKey: '&api_key=ppQkLuKY08IqGNlzBtinqtf16JVFMgELtp7g02Vw',

        initialize: function() {

        },

        generateRandomDate: function() {
            /////////////////////////////////////////////////////
            // Random APOD Date Generator                      //
            // by Geckzilla aka Judy Schmidt www.geckzilla.com //
            // Copy it, share it, modify it--I don't mind.     //
            /////////////////////////////////////////////////////

            var now = new Date(); //right now
            var min = new Date(1995, 5, 16).getTime(); // 1995 June 16 00:00:00, the first APOD
            var max = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 59, 59, 999).getTime(); // now converted UTC time at 03:59:59.999

            //taking off 6 hours because APOD goes by east coast USA time.
            //should be enough to keep anyone from landing on future APODs which won't be published yet in their timezone
            //unless their computer clock is set way off, then they'll get 404's all the time probably
            max = max - (5 * 60 * 60 * 1000);


            var random_date = Math.round(min + (Math.random() * (max - min))); //ahh, a random APOD date!

            //but wait...
            //there's one section of missing APODs in the history of APODs
            //that's the first three days after the very first APOD was posted
            //June 17th, 18th, & 19th, 1995
            var missing_min = new Date(1995, 5, 17).getTime(); //1995 June 17 00:00:00
            var missing_max = new Date(1995, 5, 19, 23, 59, 59, 999).getTime(); //1995 June 19 23:59:59.999

            //if our random date falls in this range, remake it.
            while (random_date >= missing_min && random_date <= missing_max) {
                random_date = Math.round(min + (Math.random() * (max - min)));
            }

            //convert the timestamp back into a date object
            random_date = new Date(random_date);
            this.random_year = random_date.getFullYear().toString().slice(); //in the year 2095 we're gonna have problems
            this.random_month = (0 + (random_date.getMonth() + 1).toString()).slice(-2); //zero pad the month
            this.random_day = (0 + (random_date.getDate().toString())).slice(-2); //zero pad the day


            this.randomApodDate = this.random_year + '-' + this.random_month + '-' + this.random_day;
        },

        fetch: function(options) {
            this.generateRandomDate();

            options = options || {};
            options.url = this.urlBase + this.randomApodDate + this.urlApiKey;

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        parse: function(response, options) {
            return response;
        }

    });

})();
