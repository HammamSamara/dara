var server = require('./server');
var users = require('./users');
// var algolia = require('algoliasearch');
var async = require('async');
var greeting = require('./greeting');
var askCategories = require('./askCategories');
var askDestinations = require('./askDestinations');
var askDates = require('./askDates');
var showPackages = require('./showPackages');
var showHotels = require('./showHotels');
var packageFinder = require('./result');
var hotelFinder = require('./hotelResults');
var localtunnel = require('localtunnel');
var moment = require('moment');
moment.locale('ar');

// console.log(localtunnel._opt);return;
var tunnel = localtunnel(3000, {subdomain : 'dara'}, function(err, tunnel) {
    if (err);
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});

tunnel.on('close', function() {
    console.log('Bye!');
});

server.start().then(function(controller) {

    controller.on('message_received', function(bot, message) {
        if (!shouldReply(message.user)) return false;

        console.log(message);
        bot.reply(message, greeting(message));
        askCategories(bot, message);

        return false;
    });

    controller.on('facebook_postback', function(bot, message) {
        console.log('Great Choice!!!! (' + message.payload + ')');
        if (message.payload == "real") {

          callAgent(message, bot);

        } else {

          didSelectCategory(message, bot);

        }

    });

});

function didSelectCategory(message, bot){

  users.get(message.user).set("endorsement", [message.payload]);

  askDestinations(message, bot).then(function(destination) {
      users.get(message.user).set("destination", destination);
      askDates(message, bot).then(function(checkin) {
          users.get(message.user).set("checkin", checkin);
          var currentUser = users.get(message.user);
          console.log(checkin);
          var localeTime = moment.unix(checkin).format('LL');
          console.log(localeTime);
          packageFinder.find(currentUser).then(function(res) {
              if (res.hits.length > 0) {
                bot.reply(message, 'لقد وجدت رحلات يوم ' + localeTime + ' ... من فضلك اختار رحلتلك المفضله');
                showPackages(res.hits, bot, message);
              } else {
                hotelFinder.find(currentUser).then(function(res){
                  if (res.hits.length > 0 ) {
                    bot.reply(message, ' اسف لم استطيع ايجاد رحلات لمدينه ' + res.hits[0].parents[0].name + ' في دوله ' + res.hits[0].parents[1].name + ' في يوم ' + localeTime);
                    bot.reply(message, 'في الاسفل بعض الفنادق التي تستطيع ان تحجز بها في رحلتك');
                    showHotels(res.hits, bot, message);

                  } else {
                      sorry(message, bot);
                  }

                });

              }

          })

      });
  });
}

function callAgent(message, bot){

  users.get(message.user).set("call_agent",true);

  bot.reply(message, 'please hold on for a moment ...');

  (function(){
    var user = message.user;
    setTimeout(function (){
      console.log("------------------ after 5 ----------------");
      console.log(users.get(user).call_agent);
      users.get(user).set("call_agent",false);
    }, 5000);
  })();

}

function shouldReply(user) {
  console.log(users.get(user).call_agent);
  return !users.get(user).call_agent;
}


function sorry(message, bot){
  bot.reply(message, 'Sorry, couldn\'t find your request, can you try something else');
}
/*
async.waterfall([
            function(next) {
                bot.reply(message, categories(message));
            },
            function(category, next) {
                askDestinations(bot, next);
            },
            function(destination, next) {
                askDates(bot, next);
            },
        ], function(err, result) {
            console.log("FINAL", result);
        });

 */
