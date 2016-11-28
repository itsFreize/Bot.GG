//---DO NOT DELETE THESE
const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./config/config.json')
//---DO NOT DELETE THESE

//---Upon succesfully starting the bot this will set its status and a console ready message
bot.on('ready', () =>{
  console.log('Bot.GG is connected and ready for use');
});

bot.on("guildMemberAdd", member =>{
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome ${member.user} to our Discord server!`);
});

//---Begins the command handler
bot.on('message', message =>{
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").splice(1);

//---This is the help command
  if(command === "help"){
    var fs = require("fs");
    var contents = fs.readFileSync("./config/help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.text)
  }

  //---The announce command
  //--->announce <WHAT YOU WANT TO ANNOUNCE>
  if(command === "announce"){
    message.channel.sendMessage("@everyone " + args.join(" "));
  }

  //---The kick command
  //--->kick <@USER_NAME>
  if(command === "kick"){
    let modRole = message.guild.roles.find("name", config.superuserRole);
    if(!message.member.roles.has(modRole.id)){
      return message.reply("Sorry but you dont have the power to do this!")
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mantion a user (@USER_NAME) to kick");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember){
      return message.reply("That does not seem like a valid user");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
      message.reply("I seem to lack the sufficient power to do this");
    }
    kickMember.kick().then(member =>{
      message.reply(`${member.user.username} was succesfully removed from the server ... Good Riddance!`)
    }).catch(e => {
        console.error(e);
    });
  }

  //---The purge command
  //--->purge <NUMBER OF MESSAGES TO PURGE>
  if(command === "purge"){
    let modRole = message.guild.roles.find("name", config.superuserRole);
    if (!message.member.roles.has(modRole.id)){
      return message.reply("I'm sorry but you dont have the power to do this!");
    }
    message.channel.bulkDelete(args.join(" "));
  }

  //---The dice command
  if(command === "dice"){
    var droll = require('droll');
    var result = droll.roll('2d6');

    message.reply(`Your dice results are: ${result}`);
  }

  //---Baisc maths Commands
  //---The addition command
  if(command === "add"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);

    message.reply(`You asked me to add together  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The subtraction command
  if(command === "subtract"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);

    message.reply(`You asked me to subtract  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The multiplication command
  if(command == "multiply"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);

    message.reply(`You asked me to multiply  ` + args.join(" ") + `, the result was: ${total}`);
  }
  //---The division command
  if(command === "divide"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);

    message.reply(`You asked me to divide  ` + args.join(" ") + `, the result was: ${total}`);
  }

  //StratRoullete
  if(command === "strat"){
    var fs = require("fs");
    var contents = fs.readFileSync("./lib/strats.json");
    var jsonContent = JSON.parse(contents);
    var Strat = new Array()

    Strat[0] = jsonContent.strat1;
    Strat[1] = jsonContent.strat2;
    Strat[2] = jsonContent.strat3;
    Strat[3] = jsonContent.strat4;
    Strat[4] = jsonContent.strat5;
    Strat[5] = jsonContent.strat6;
    Strat[6] = jsonContent.strat7;
    Strat[7] = jsonContent.strat8;
    Strat[8] = jsonContent.strat9;
    Strat[9] = jsonContent.strat10;
    Strat[10] = jsonContent.strat11;
    Strat[11] = jsonContent.strat12;
    Strat[12] = jsonContent.strat13;
    Strat[13] = jsonContent.strat14;
    Strat[14] = jsonContent.strat15;
    Strat[15] = jsonContent.strat16;
    Strat[16] = jsonContent.strat17;
    Strat[17] = jsonContent.strat18;
    Strat[18] = jsonContent.strat19;
    Strat[19] = jsonContent.strat20;
    Strat[20] = jsonContent.strat21;
    Strat[21] = jsonContent.strat22;
    Strat[22] = jsonContent.strat23;
    Strat[23] = jsonContent.strat24;
    Strat[24] = jsonContent.strat25;

    var S = Strat.length;
    var whichStrat = Math.round(Math.random()*(S-1));
    function showStrat(){
      message.reply(Strat[whichStrat]);
    }
    showStrat();
  }

  //Server info command
  if(command === "servers"){
    var fs = require("fs");
    var contents = fs.readFileSync("./lib/servers.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: jsonContent.serverListTitle,
        description: jsonContent.serverListDescription,
        fields:[
          {
            name: jsonContent.serverName1,
            value: jsonContent.server1
          },
          {
            name: jsonContent.serverName2,
            value: jsonContent.server2
          },
          {
            name: jsonContent.serverName3,
            value: jsonContent.server3
          },
          {
            name: jsonContent.serverName4,
            value: jsonContent.server4
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: jsonContent.serverListFooter,
          inline: true
        }
      }
    });
  }
});
//---This logs the bot in
bot.login(config.token)
