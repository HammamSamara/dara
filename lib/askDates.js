module.exports = function(bot, message) {
    return new Promise(function(resolve, reject) {
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.ask('When? What are the dates?', function(response, convo) {
                    $results = hrono.parse(esponse.text);
                    resolve(results[0].start.date());
                });
            } else{
                reject(err);
            }
        });
    })
}
