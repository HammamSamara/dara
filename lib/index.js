var server = require('./server');
var users = require('./users');
var algolia = require('algoliasearch');
var async = require('async');
var askCategories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');

server.start().then(function(bot) {

    async.waterfall([
        askCategories,
        askDestinations,
        askDates,
    ], function(err, result) {
        console.log("FINAL", result);
    });
});
