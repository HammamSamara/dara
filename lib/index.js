var server = require('./server');
var users = require('./users');
// var algolia = require('algoliasearch');
var async = require('async');
var greeting = require('./greeting');
var askCategories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');
var packageFinder = require('./result');

server.start().then(function(controller) {

    controller.on('message_received', function(bot, message) {
        bot.reply(message, greeting(message));
        askCategories(bot, message);

        return false;
    });

    controller.on('facebook_postback', function(bot, message) {
        console.log('Great Choice!!!! (' + message.payload + ')');
        bot.reply(message, 'Great Choice!!!! (' + message.payload + ')');
        users.get(message.user).set("endorsement", [message.payload]);
        askDestinations(message, bot).then(function(destination) {
            users.get(message.user).set("destination", destination);
            askDates(message, bot).then(function(checkin) {
                users.get(message.user).set("checkin", checkin);
                var currentUser = users.get(message.user);
                packageFinder.find(currentUser).then(function(res){
                    console.log(res.hits);
                })

            });
        });
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
