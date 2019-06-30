const token = process.env.TOKEN;
const fetch = require('node-fetch');
const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
  const name = msg.from.first_name;
  const messagedata = msg.text;
  fetch(`https://thesmartbot.herokuapp.com/forecast/${messagedata}`)
    .then(res => res.json())
    .then(json => 
  bot.sendMessage(msg.chat.id, json).then(() => {
    // reply sent!
  }));
});

module.exports = bot;