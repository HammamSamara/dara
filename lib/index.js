var server = require('./server');
var users = require('./users');
var algolia = require('algoliasearch');
var async = require('async');
var greeting = require('./greeting');
var askCategories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');

server.start().then(function(controller) {
    controller.on('message_received', function(bot, message) {
        bot.reply(message, greeting(message));
        async.waterfall([
            function(next) {
                askCategories(bot);
                next();
            },
            function(category, next) {
                askDestinations(bot);
                next();
            },
            function(destination, next) {
                askDates(bot);
                next();
            },
        ], function(err, result) {
            console.log("FINAL", result);
        });
        return false;
    });
});
