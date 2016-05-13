module.exports = function(bot, message) {
  bot.reply(message, {
    attachment: {
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Please select a category?",
        "buttons":[
          {
            "type":"postback",
            "title":"Moon",
            "payload":"moon"
          },
          {
            "type":"postback",
            "title":"x",
            "payload":"x"
          },
          {
            "type":"postback",
            "title":"y",
            "payload":"y"
          }
        ]
      }
  }
  });
}
