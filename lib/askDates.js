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
                convo.ask('When? What are the dates?', function(response, convo) {
                    googleTranslate.translate(response.text, 'en', function(err, translation) {
                        translatedText = translation.translatedText;
                        console.log(translatedText);
                        results = chrono.parse(translatedText);
                        try {
                              resolve(moment(results[0].start.date()).unix());
                              convo.next();
                        } catch(e){
                            convo.repeat();
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
