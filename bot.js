const serverListener = require("./server");
const Discord = require("discord.js");
const client = new Discord.Client();

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
  if (message.content === "!ping") message.reply("Pong!");
});

async function onNotification(message) {

}

serverListener.on("turn", onNotification);

client.login(process.env.BOT_TOKEN);