var server = require('./server');
var users = require('./users');
var algolia = require('algoliasearch');
var async = require('async');
var askCategories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');

server.start().then(function(bot, controller) {

    async.waterfall([
    	function(next){
    		start(controller, next);
    	},
        askCategories,
        askDestinations,
        askDates,
    ], function(err, result) {
        console.log("FINAL", result);
    });
});


function start(controller, callback) {

	controller.hears(['hello', 'hi', 'hey'], 'message_received', function(bot, message) {

    console.log(message);
    console.log(message.user);

    identifyUser(message.user);

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hey, I can plan your trip, what kind of vacation?');
            next();
        }

    });
});
}
