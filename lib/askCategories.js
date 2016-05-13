module.exports = function(bot, message){
	// bot.reply(message, '');
	bot.reply(message, {
		attachment: {
			"type":"template",
			"payload":{
				"template_type":"button",
				"text":"ما نوع الرحله التي تريد القيام بها؟",
				"buttons":[
					{
						"type":"postback",
						"title":"رحله اصدقاء",
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
				"text":".",
				"buttons":[
					{
						"type":"postback",
						"title":".",
						"payload":"Friends2"
					},
					{
						"type":"postback",
						"title":".",
						"payload":"last102"
					},
					{
						"type":"postback",
						"title":"لا يهم",
						"payload":"Family2"
					}
				]
			}
	}
	});
}
}
