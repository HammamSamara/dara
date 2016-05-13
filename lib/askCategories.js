module.exports = function(bot, message){
	bot.reply(message, 'Hey, I can plan your trip, what kind of vacation?');
	bot.reply(message, {
		attachment: {
			"type":"template",
			"payload":{
				"template_type":"button",
				"text":"Please select a category?",
				"buttons":[
					{
						"type":"postback",
						"title":"Friends",
						"payload":"Friends"
					},
					{
						"type":"postback",
						"title":"العشره الاواخر",
						"payload":"last10"
					},
					{
						"type":"postback",
						"title":"عائله",
						"payload":"Family"
					}
				]
			}
	}
});

setTimeout(more,1000);

function more(){

	bot.reply(message, {
		attachment: {
			"type":"template",
			"payload":{
				"template_type":"button",
				"text":"...",
				"buttons":[
					{
						"type":"postback",
						"title":"Frsssiends",
						"payload":"Friends2"
					},
					{
						"type":"postback",
						"title":"العddشره الاواخر",
						"payload":"last102"
					},
					{
						"type":"postback",
						"title":"عاdddئله",
						"payload":"Family2"
					}
				]
			}
	}
	});
}
}
