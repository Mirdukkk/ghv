module.exports = async (client) => {
    console.log(`${client.user.username} Turn on!`)
    client.user.setActivity(`!помощь`, { type: 'STREAMING', url: 'https://www.twitch.tv/le1zz' })
}

