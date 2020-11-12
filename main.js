const Discord = require('discord.js')
const config = require('./_settings/config.json')
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./_commands/')
client.objs = require('./_data/objects.js');

client.config = config

fs.readdir('./_events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./_events`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

[ 'command' ].forEach(handler => {
    require(`./_handler`)(client);
});

client.login(process.env.TOKENVOICE);