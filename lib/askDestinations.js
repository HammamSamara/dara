module.exports = function(message, bot) {
	return new Promise(function(resolve, reject){
	    bot.startConversation(message, function(err, convo) {
	        if (!err) {
	            convo.ask('Where do you like to go??', function(response, convo) {
	        		resolve(response.text);
	            });
	        }else{
	        	reject(err);
	        }
	    });
	})
}
