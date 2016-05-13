module.exports = function(packages, bot, message){
  var elements = [];
  for(var i = 0 ; i< packages.length; i++){
    elements.push({
        'title': packages[i].title,
        'image_url': packages[i].cover_image,
        'subtitle': packages[i].subtitle,
        'buttons': [
            {
                'type': 'web_url',
                'url': encodeURI('https://www.yamsafer.com/'+packages[i].slug),
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
