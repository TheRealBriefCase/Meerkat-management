const discord = require('discord.js');
exports.run = async (client, message, args) => {
const config = require('../config.json');
client.config = config
  if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return;
  message.delete()
  
  if(isNaN(args[0])){
      
  let numberEmbed = new discord.MessageEmbed()
  .setColor('#0F9AA1')
  .setDescription(`
    **Command: ${client.config.prefix}purge** \n
      **Usage:**\n
      ${client.config.prefix}purge [count 1 - 100]`)
      return message.channel.send(numberEmbed)
  }
  if (args[0] > 100) {
    let toomany = new discord.MessageEmbed()
    .setColor('#B01D09')
    .setDescription('❌ pick a number between 1-100')
    return message.channel.send(toomany)
    
  }
  
  message.channel.bulkDelete(args[0])
  .then
    let successEmbed = new discord.MessageEmbed()
  .setColor('#077E24')
  .setDescription(`✅ I have purged ${args[0]} messages`)
  .setFooter('This embed will delete after 5 seconds')
  message.channel.send(successEmbed).then(message => {message.delete({ timeout: 5000})});
}