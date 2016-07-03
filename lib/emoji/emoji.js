module.exports = { 
  remove_thinking: function(bot, message) {
    bot.api.reactions.remove({
      timestamp: message.ts,
      channel: message.channel,
      name: 'thinking_face',
    },function(err,res) {
        if (err) {
          bot.botkit.log("soz no emoji lulz",err);
        }
      });
  }
}