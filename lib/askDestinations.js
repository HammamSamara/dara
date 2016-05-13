module.exports = function(message, bot) {
    return new Promise(function(resolve, reject){
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.ask('من فضلك حدد المدينه التي تريد الذهاب اليها؟', function(response, convo) {
                    resolve(response.text);
                    convo.next();
                });
            }else{
                reject(err);
            }
        });
    })
}
