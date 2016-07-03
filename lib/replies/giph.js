var request = require("request");
module.exports = function (bot, message) {
    request("http://api.giphy.com/v1/gifs/search?q=fail&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

      var max = data.data.length;
      var min = 0;

      var randomNumber = Math.floor(Math.random() * (max - min)) + min;

      gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = "Sorry, I don't know how to respond to that :(\n" + gifUrl;

      bot.reply(message, replyMessage, function(err) {
        console.log(err);
      });
    });



    //Remove "working on it" reaction
    bot.api.reactions.remove({timestamp: message.ts, channel: message.channel, name: 'thinking_face'},function(err,res) {
      if (err) {
        bot.botkit.log("Failed to remove emoji reaction :(",err);
      }
    });

    
    //Add "sorry it failed" reaction
    bot.api.reactions.add({timestamp: message.ts, channel: message.channel, name: 'slightly_frowning_face'},function(err,res) {
      if (err) {
        bot.botkit.log("Failed to add emoji reaction :(",err);
      }
    });
};