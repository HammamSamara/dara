var chrono = require('chrono-node');
var moment = require('moment');

if (!process.env.google_translate_key) {
    console.log('Error: Specify google_translate_key in environment');
    process.exit(1);
}

var googleTranslate = require('google-translate')(process.env.google_translate_key);

module.exports = function(message, bot) {
    return new Promise(function(resolve, reject) {
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.ask('الان حدد تاريخ رحلتك ؟', function(response, convo) {
                    googleTranslate.translate(response.text, 'en', function(err, translation) {
                        translatedText = translation.translatedText;
                        console.log(translatedText);
                        results = chrono.parse(translatedText);
                        try {
                              console.log(results[0].start.date());
                              resolve(moment(results[0].start.date()).unix());
                              convo.next();
                        } catch(e){
                            console.error(e);
                            bot.reply(message, 'اسف لم استطيع فهم التاريخ!!');
                            convo.repeat();
                            convo.next();
                        }
                    });
                });
            } else{
              convo.repeat();
              reject(err);
            }
        });
    })
}
