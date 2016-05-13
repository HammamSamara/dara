var chrono = require('chrono-node');
var moment = require('moment');

module.exports = function(message, bot) {
    return new Promise(function(resolve, reject) {
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.ask('الان حدد تاريخ رحلتك ؟', function(response, convo) {
                    results = chrono.parse(response.text);
                    try {
                      resolve(moment(results[0].start.date()).unix());
                      convo.next();
                    } catch(e){
                      convo.repeat();
                    }


                });
            } else{
              convo.repeat();
                reject(err);
            }
        });
    })
}
