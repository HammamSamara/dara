module.exports = {
    start: function() {

        if (!process.env.page_token) {
            console.log('Error: Specify page_token in environment');
            process.exit(1);
        }

        if (!process.env.verify_token) {
            console.log('Error: Specify verify_token in environment');
            process.exit(1);
        }

        var Botkit = require('botkit');
        var os = require('os');

        var controller = Botkit.facebookbot({
            debug: true,
            access_token: process.env.page_token,
            verify_token: process.env.verify_token,
        });

        var bot = controller.spawn({});

        return new Promise(function(resolve, reject){
            controller.setupWebserver(process.env.port || 3000, function(err, webserver) {
                if(err) {
                    return reject();
                }
                else {
                    controller.createWebhookEndpoints(webserver, bot);
                    resolve(controller);
                }
            });
        })
    }
}
