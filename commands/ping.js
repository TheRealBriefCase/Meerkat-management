const discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let embed = new discord.MessageEmbed()
  .setColor('#0F9AA1')
  .setTitle('Pinging...')
  let m = await message.channel.send(embed)
  
let pingembed = new discord.MessageEmbed()
.setColor('#0F9AA1')
.setTitle('🏓 Pong!')
.setDescription (`
Client's Latency: \`${m.createdTimestamp - message.createdTimestamp}ms\`\n
API Latency: \`${Math.round(client.ws.ping)}ms\``)
m.edit(pingembed)
}