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