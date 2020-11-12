const Discord = require('discord.js');
module.exports = async (client, msg) => {
    const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);    
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    if (!command) {
        command = client.commands.get(client.aliases.get(cmd))
    }
    if (!command) return

    if (command) { // permission check 
        command.run(client, msg, args)
    }
}