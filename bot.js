require('dotenv').config();
var emoji = require('./lib/emoji/emoji.js');

/* Uses the slack button feature to offer a real time bot to multiple teams */

// Requirements
var Botkit = require('botkit')

var Witbot = require("witbot");
var witbot = Witbot(process.env.wit_token);


if (!process.env.slack_token) {
  console.log('Error: Specify slack_token and botkit_port in environment');
  process.exit(1);
}

if (!process.env.wit_token) {
    console.log('Error: Specify wit_token in environment');
    process.exit(1);
}


var controller = Botkit.slackbot({
    debug: false
});

var bot = controller.spawn({
    token: process.env.slack_token
}).startRTM();


controller.on('rtm_open',function(bot) {
  console.log('** The RTM api just connected!');
});

controller.on('rtm_close',function(bot) {
  console.log('** The RTM api just closed');
  // you may want to attempt to re-open
});

// Actual Bot response logic

controller.hears('hello','direct_message',function(bot,message) {
  bot.reply(message,'Hello!');
});



controller.hears('.*', 'direct_message,direct_mention,mention', function (bot, message) {
//Add "working on it" reaction
  bot.api.reactions.add({timestamp: message.ts, channel: message.channel, name: 'thinking_face'},function(err,res) {
    if (err) {
      bot.botkit.log("Failed to add emoji reaction :(",err);
    }
  });

  var wit = witbot.process(message.text, bot, message);

  wit.hears("schedule", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is the schedule:\n \
      *Saturday:*\n \
      09:30  Registration\n \
      10:30  Opening Ceremony & Sponsor Presentations\n \
      11:30  Team-building Session\n \
      12:00  Hacking begins\n \
      13:00  BlackRock workshop\n \
      14:00  Lunch\n \
      15:00  Swift workshop\n \
      16:00  MLH Bloomberg No Light\n \
      17:00  Vim Workshop\n \
      19:00  Dinner\n \
      20:00  Cup Stacking (Mini-Event)\n \
      22:00  Sleeping Area opens\n\n \
      *Sunday:*\n \
      00:00  Midnight Meal\n \
      01:00  Werewolf\n \
      08:00  Breakfast\n \
      12:00  Hacking ends, Science fair begins\n \
      13:00  Lunch is served\n \
      14.30  Judges retreat for deliberations.\n \
      15:00  Top 5 presentations announced\n \
      15:15  Finalists present\n \
      16:00  Prize-giving Presentation + Closing Ceremony\n \
      16.45  End\n\n \
      Link to live schedule: https://hacklondon.org/schedule"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("map", 0.5, function(bot, message, outcome){
    var mapMessage = {
      text: "Map: https://drive.google.com/uc?export=view&id=0Bw8MREGeZ1i7R1JrX1pqcEpYZzA",
      unfurl_links: "true",
      unfurl_media: "true",
    };
    bot.reply(message, mapMessage, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("code_of_conduct", 0.5, function(bot, message, outcome){
    var response = {
      text: "Code of Conduct\nhttp://static.mlh.io/docs/mlh-code-of-conduct.pdf\n \
      As part of this event, you have agreed to the code of conduct."
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("devpost", 0.5, function(bot, message, outcome){
    var response = {
      text: "Devpost\nhttp://hacklondon2016.devpost.com/"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("emergency", 0.5, function(bot, message, outcome){
    var response = {
      text: " \
      If this is an emergency:\n \
      Inform @josh or @kp (+44<REDACTED>) immediately.\n \
      Call Security at this number:\n \
      `020 7679 2222`\n\n \
      If this is an incident you want to report, talk to any of the `organizers` and email incidents@mlh.io or call +44<REDACTED>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("hardware", 0.5, function(bot, message, outcome){
    var response = {
      text: "MLH is located in the South Cloister\n \
Here is a list of the hardware MLH brought:\n \
      Oculus Rift\n \
      Thalmic Myo\n \
      Leap Motion\n \
      Intel Edison\n \
      Arduino \n \
      Spark Core\n \
      Muse Headset\n \
      Pebble\n \
      Tessel\n \
      Nest"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("help", 0.5, function(bot, message, outcome){
    var response = {
      text: "At the moment I am capable of informing you about the following things:\n \
        `code of conduct`: Location MLH code of conduct\n \
        `devpost`: Devpost Link where you can submit your hack\n \
        `emergency`: What to do in an emergency\n \
        `hardware`: The hardware that MLH brought\n \
        `help`: You just used this command :robot_face:\n \
        `internet`: How to connect to the internet\n \
        `judging`: How judging will work\n \
        `judges`: A list of the judges\n \
        `judging schedule`: The judging schedule\n \
        `map`: A map with the relevant places\n \
        `organizers`: A list of the main organizers\n \
        `schedule`: The event schedule\n \
        `sponsors`: The 2016 HackLondon Sponsors\n \
        `sposor name here`: This will well you some information and the location of the sponsor\n \
        `travel reimbursements`: Some more information about travel reimbursements\n \
        `prizes`: Information about prizes\n \
        `twitter`: Suggested hashtags to use (Hint: It's #hacklondon)\n \
        `welcome`: A link to the welcome pack\n \
        `headless challenge`: An explanation of the headless challenge"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("judging", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is how the judging will work:\n \
      You will have 3 minutes to present (including questions) and remember: no powerpoint presentation or equivalent! Just the hack!"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })


  wit.hears("sponsors", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is a list of our wonderful sponsors:\n \
        Capital One\n \
        J.P. Morgan\n \
        Pusher\n \
        Bloomberg\n \
        BlackRock\n \
        ANDigital\n \
        Whitbread\n \
        Skyscanner\n \
        Goldman Sachs\n \
        chirp.io\n \
        hackajob\n \
        Uepaa (p2pkit)\n"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("organizers", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is a list of the main organizers:\n \
KP\n \
Josh\n \
Zahra\n \
Fares"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("botname", 0.5, function(bot, message, outcome){
    var response = {
      text: "Hey!! I'm HackLondonBot. I hope to make your life just a little better! :robot_face:"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("travel", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is the link to the travel reimbursements page:\n \
      http://hacklondon.org/travel.html"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("blackrock", 0.5, function(bot, message, outcome){
    var response = {
      text: "BlackRock is located in the South Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })


  wit.hears("mlh", 0.5, function(bot, message, outcome){
    var response = {
      text: "MLH is located in the South Cloister.\n \
http://mlh.sexy\n \
Challenge Details:\n \
- Best Use of Amazon Web Services\n \
- Best Domain Name Registered With Domain.com\n \
- Best Developer Tool by GitHub\n \
- Best Octocat Drawing (Tweet @GitHubEducation #HackLondon)"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("hackajob", 0.5, function(bot, message, outcome){
    var response = {
      text: "Hackajob is located in the South Cloister. \n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("whitbread", 0.5, function(bot, message, outcome){
    var response = {
      text: "Whitbread is located in the South Cloister. \n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("andigital", 0.5, function(bot, message, outcome){
    var response = {
      text: "ANDigital is located in the South Cloister. \n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("chirp", 0.5, function(bot, message, outcome){
    var response = {
      text: "Chirp is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("bloomberg", 0.5, function(bot, message, outcome){
    var response = {
      text: "Bloomberg is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("jpmorgan", 0.5, function(bot, message, outcome){
    var response = {
      text: "JP Morgan is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("capitalone", 0.5, function(bot, message, outcome){
    var response = {
      text: "Capital One is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("skyscanner", 0.5, function(bot, message, outcome){
    var response = {
      text: "Skyscanner is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("pusher", 0.5, function(bot, message, outcome){
    var response = {
      text: "Pusher is located in the North Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("uepaa", 0.5, function(bot, message, outcome){
    var response = {
      text: "Uepaa (p2pkit) are not physically present, but you can reach them <HERE>\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("goldman", 0.5, function(bot, message, outcome){
    var response = {
      text: "Goldman Sachs is located in the South Cloister.\n \
<SPONSOR TEXT>"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("prizes", 0.5, function(bot, message, outcome){
    var response = {text: ""};
    var randomNumber = Math.floor(Math.random() * 10);

    switch(randomNumber){
      case 0: response.text = "It's not all about the prizes"; break;
      default: response.text = "*Prizes*:\n     *Grand Prize*: TrackR Bravo + Amazon Fire Tablet\n \
    *Runner Up*: Syma X5-SC1 Drone + Xiaomi Fitness Tracker\n \
    *Fresher Hack*: PowerCube + Amazon Voucher\n \
    *Headless Challenge*: Arduino Touch Screen + Multicoloured 40P Jumper Cables + Kuman Projec Arduino UNO R3 Board\n \
    *Most Entertaining*: A _very_ special surprise :tada:";
    }

    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })


  wit.hears("twitter", 0.5, function(bot, message, outcome){
    var response = {
      text: "When you tweet or instagram, make sure to include @hacklondonuk and #hacklondon :simple_smile:"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })


  wit.hears("welcome", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here's the link to the welcome pack.\nhttp://hacklondon.org/welcome/"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("judges", 0.5, function(bot, message, outcome){
    var response = {
      text: "Here is list of the judges:\ \
      More will come here"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("nofoodleft", 0.5, function(bot, message, outcome){
    var response = {
      text: "Tell a volunteer, and they'll get some more food :simple_smile:"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("generic", 0.5, function(bot, message, outcome){
    var response = {
      text: "Talk to one of us, and we'll try to get it sorted."
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("headless", 0.5, function(bot, message, outcome){
    var response = {
      text: "*Headless Challenge*:\n \
      To compete in the headless challenge, build a program, service, or script with an emphasis on the fundamentals.\
      Judging will not be based on UX design, but will focus on the achievements of your application in terms of the functionality \
      achieved."
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.hears("judging_schedule", 0.5, function(bot, message, outcome){
    var response = {
      text: "*Judging Schedule*: Be ready to present your hack from your designed time onwards!\n \
      Team        Judging Time\n \
      01            12:00\n \
      02            12:04\n \
      03            12:08\n \
      04            12:12\n \
      05            12:16\n \
      06            12:20\n \
      07            12:24\n \
      08            12:28\n \
      09            12:32\n \
      10            12:36\n \
      11            12:40\n \
      12            12:44\n \
      13            12:48\n \
      14            12:52\n \
      15            12:56\n \
      16            13:00\n \
      -------------------\n \
      17            12:00\n \
      18            12:04\n \
      19            12:08\n \
      20            12:12\n \
      21            12:16\n \
      22            12:20\n \
      23            12:24\n \
      24            12:28\n \
      25            12:32\n \
      26            12:36\n \
      27            12:40\n \
      28            12:44\n \
      29            12:48\n \
      30            12:52\n \
      31            12:56\n \
      32            13:00\n \
      33            13:04\n \
      -------------------\n \
      34            12:00\n \
      35            12:04\n \
      36            12:08\n \
      37            12:12\n \
      38            12:16\n \
      39            12:20\n \
      40            12:24\n \
      41            12:28\n \
      42            12:32\n \
      43            12:36\n \
      44            12:40\n \
      45            12:44\n \
      46            12:48\n \
      47            12:52\n \
      48            12:56\n \
      49            13:00\n \
      50            13:04\n"
    }
    bot.reply(message, response, function(){
      emoji.remove_thinking(bot, message);
    })
  })

  wit.otherwise(require('./lib/replies/giph.js'));
})
