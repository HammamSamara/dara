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
						"title":"Honey Moon",
						"payload":"HoneyMoon"
					},
					{
						"type":"postback",
						"title":"العشره الاواخر",
						"payload":"last10"
					},
					{
						"type":"postback",
						"title":"رمضان",
						"payload":"Ramadan"
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
}
