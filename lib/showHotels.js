module.exports = function(hotels, bot, message){
  var elements = [];
  for(var i = 0 ; i< hotels.length; i++){
    elements.push({
        'title': hotels[i].name,
        'image_url': hotels[i].info.cover_image,
        'subtitle': hotels[i].info.distance_from_attraction,
        'buttons': [
            {
                'type': 'web_url',
                'url': 'https://yamsafer.com/'+hotels[i].info.slug,
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
  console.log(elements);
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
