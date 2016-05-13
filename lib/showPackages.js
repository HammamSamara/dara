module.exports = function(packages, bot, message){
  var elements = [];
  foreach(packages as package) {
    elements.push({
        'title': package.title,
        'image_url': package.cover_image,
        'subtitle': package.subtitle,
        'buttons': [
            {
                'type': 'web_url',
                'url': package.slug,
                'title': 'Book'
            },
            {
                'type': 'postback',
                'title': 'Call real agent',
                'payload': 'real'
            }
        ]
    });
  }
	bot.reply(message, 'Feel free to pick your favourite package!!');
	bot.reply(message, {
		attachment: {
			"type":"template",
			"payload":{
				"template_type":"generic",
				"elements": elements
			}
	}
	});
}
