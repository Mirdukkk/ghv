const Discord = require(`discord.js`)
module.exports = {
    name: `ping`,
    category: `General`,
    permission: 0,
    usage: `пинг`,
    run: async (client, msg, args) => {
        msg.channel.send(`Понг ${Math.round(client.ws.ping)}мс`)
    }
}