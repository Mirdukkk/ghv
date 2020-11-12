const Discord = require('discord.js')
module.exports = async (client, oldState, newState) => {
    const name = `Автор: ${newState.member.user.username}`
    if (newState && newState.channel && newState.channelID == `734892740260659231` ) {
        if (client.objs.createdVoices.find(e => e.memberID == newState.id)) return newState.setChannel(client.channels.cache.get(client.objs.createdVoices.find(e => e.memberID == newState).chID))
        newState.guild.channels.create(name, {
            parent: `734892739602284614`,
            type: `voice`,
            permissionOverwrites: [{
                id: newState.id,
                allow: [`CONNECT`, `SPEAK`, `MANAGE_CHANNELS`],
                deny: [`MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`]
            }]
        }).then(async chan => {
            await chan.setBitrate(96000)
            await chan.setUserLimit(10)
            newState.setChannel(chan)
            client.objs.createdVoices.set(chan.id, {
                memberID: newState.id,
                chID: chan.id
            });
        })
    }
    else if (oldState && oldState.channel && client.channels.cache.get(oldState.channelID).members.size === 0) {
        if (!client.objs.createdVoices.has(oldState.channelID)) return client.objs.createdVoices.delete(oldState.channelID)
        if (newState && oldState.channelID === newState.channelID) return;
        if (client.channels.cache.get(oldState.channelID)) client.channels.cache.get(oldState.channelID).delete();
        return client.objs.createdVoices.delete(oldState.channelID)
    }
}
module.exports.config = {
  name: 'voiceStateUpdate'
};