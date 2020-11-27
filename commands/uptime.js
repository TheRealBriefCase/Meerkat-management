const discord = require('discord.js')
const ms = require('ms')

exports.run = async (client, message, args) => {
  
  let embed = new discord.MessageEmbed()
  .setColor('#0F9AA1')
  .setDescription(`Current uptime: \`${ms(client.uptime,{ long: true})}\``)
  message.channel.send(embed)
}