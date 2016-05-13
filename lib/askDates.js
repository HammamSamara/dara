var chrono = require('chrono-node');
var moment = require('moment');

module.exports = function(bot, message) {
    return new Promise(function(resolve, reject) {
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.ask('When? What are the dates?', function(response, convo) {
                    results = chrono.parse(response.text);
                    resolve(moment(results[0].start.date()).unix());
                });
            } else{
                reject(err);
            }
        });
    })
}
