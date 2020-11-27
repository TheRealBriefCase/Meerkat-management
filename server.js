const express = require("express");
const app = express();
app.get("/", (request, response) =>{
  response.sendStatus(200);
});
app.listen(process.env.port)

const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const fs = require('fs')
const figlet = require('figlet');
const chalk = require('chalk');
client.config = config

let commandlist = [];


fs.readdir('./commands/', async (err, files) => {
  if(err){
    return console.log(chalk.red('An error occured when checking the commands folder for commands to load: '+err));
  }
  files.forEach(async(file) => {
    if(!file.endsWith('.js')) return;
    let commandFile = require(`./commands/${file}`);
    commandlist.push({
      file: commandFile,
      name: file.split('.')[0]
    });
  });
});

client.on('ready', async () => {
  console.log(chalk.yellow(figlet.textSync('MeerCat Management', {horizontalLayout: 'full' })));
  console.log(chalk.red(`Bot started! \n---\n`
  + `> Users: ${client.users.cache.size}\n`
  + `> Channels: ${client.channels.cache.size}\n`
  + `> Servers: ${client.guilds.cache.size}`));
})

client.on('message', async (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(client.config.prefix)) return;
  const args = message.content.slice(client.config.prefix.length).split(' ');
  const commandName = args[0].toLowerCase();
  args.shift();
  const command = commandlist.findIndex((cmd) => cmd.name === commandName);
  if(command == -1) return;
  commandlist[command].file.run(client, message, args);
});


client.login(process.env.SECRET)