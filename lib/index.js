var server = require('./server');
var users = require('./users');
var algolia = require('algoliasearch');
var async = require('async');
var greeting = require('./greeting');
var categories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');

server.start().then(function(controller) {

    controller.on('message_received', function(bot, message) {
        bot.reply(message, greeting(message));
        askDestinations(message, bot).then(function(destination){
            console.log('destination', destination);
        });
        return false;
    });

    controller.on('facebook_postback', function(bot, message) {
        bot.reply(message, 'Great Choice!!!! (' + message.payload + ')');
    });
});

/*
async.waterfall([
            function(next) {
                bot.reply(message, categories(message));
            },
            function(category, next) {
                askDestinations(bot, next);
            },
            function(destination, next) {
                askDates(bot, next);
            },
        ], function(err, result) {
            console.log("FINAL", result);
        });

 */
