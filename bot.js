const serverListener = require("./server");
const Discord = require("discord.js");
const client = new Discord.Client();
const mailer = require("./mails/mailer");
const fs = require("fs");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", member => {
  console.log(member)
  let guild = member.guild;
  let user = member.user;
  if (guild.systemChannel) {
    guild.systemChannel.send(new Discord.MessageEmbed()
    .setTitle("A new user joined!")
    .setDescription(`${user.username} has joined the guild`)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("Members now", guild.memberCount)
    .setTimestamp()
    );
  }
});

client.on("message", message => {
  let command = message.content.split(" ");
  let username;

  switch (command[0]) {
    case "!ping":
      message.reply("Pong!");
      break;
    case "!mail":
      if(command.length > 1) mailCommands(command, username);
      break;
    default:
      break;
  }
});

function mailCommands(command, username) {
  let rawData = fs.readFileSync('./db/users.json');
  let cachedUsers = JSON.parse(rawData);

  switch (command[1]) {
    case "add":
      if (command.length === 3) {
        cachedUsers.push({
          username,
          globalNotify: true,
          email: command[3],
          emailNotify: true
        });
      }
      break;
    case "off":
      break;
    case "replace":
      break;
    case "on":
      break;
    default:
      break;
  }

  fs.writeFileSync("./db/users.json", cachedUsers);
}

async function onNotification(channelId, username, turn, game) {
  let botChannel = await client.channels.fetch(channelId);
  let collection = botChannel.guild.members.cache;
  let guildMembers = Array.from(collection.values());
  let guildMember = guildMembers.filter(guildMember => guildMember.user.username === username);
  
  if (guildMember.length) {
    let memberId = guildMember[0].user.id;
    botChannel.send(`Hey <@${memberId}>, it's time to take your turn ${turn} in ${game}`);
  }
}

serverListener.on("turn", onNotification);

client.login(process.env.BOT_TOKEN);