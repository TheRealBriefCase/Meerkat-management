const discord = require('discord.js');
exports.run = async (client, message, args) => {
const config = require('../config.json');
client.config = config
  if (!message.member.hasPermission(['BAN_MEMBERS'])) return;
  message.delete()
  const user = message.mentions.users.first();
  if (user){
    const reason = args.slice(1).join(" ")
    const member = message.guild.member(user)
    if(member) {
      if(member.hasPermission(['ADMINISTRATOR'])) {
        let AdminEmbed = new discord.MessageEmbed()
        .setColor('#B01D09')
        .setDescription(`❌ **${user.tag}** is an Admin, I cannot do that.`)
        return message.channel.send(AdminEmbed)
      }
      
      if(!reason) {
        member
        .kick(`Banned by ${message.author.tag}`)
        .then(() => {
          let Successembed1 = new discord.MessageEmbed()
          .setColor('#077E24')
          .setDescription(`✅ **${user.tag}** has been banned.`)
          message.channel.send(Successembed1)
        })}else{
          member
          .ban ({
            reason: `${reason}`,
          })
          .then(() => {
          let Successembed = new discord.MessageEmbed()
          .setColor('#077E24')
          .setDescription(`✅ **${user.tag}** has been banned.`)
          message.channel.send(Successembed)
          })}
    } else {
      let NEmbed = new discord.MessageEmbed()
      .setColor('#B01D09')
      .setDescription(`${user.tag} is not in this server.`)
      message.channel.send(NEmbed)
    }
  } else {
     let MentionEmbed = new discord.MessageEmbed()
      .setColor('#0F9AA1')
      .setDescription(`
      **Command: ${client.config.prefix}ban** \n
      **Usage:**\n
      ${client.config.prefix}ban [user] (reason)`)
      message.channel.send(MentionEmbed)
  }
};