const { MessageEmbed } = require('discord.js');
const { guildId, logChannelId } = require('../config.json');
module.exports = {
  name: 'channelUpdate',
  async execute(oldChannel, newChannel) {
    const logChannel = await oldChannel.guild.channels.fetch(logChannelId);
    const channelChangedEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor({ name: 'Channel Update' })
          .setFooter({text: `id: ${oldChannel.id}`})
          .setTimestamp();
    if(oldChannel.name !== newChannel.name) channelChangedEmbed.addField('Name changed', `From ${oldChannel.name} to ${newChannel.name}`)
    if(oldChannel.topic !== newChannel.topic) {
      const oldTopic = oldChannel.topic === null ? 'null' : oldChannel.topic;
      const newTopic = newChannel.topic === null ? 'null' : newChannel.topic;
      channelChangedEmbed.addFields({name: 'Old topic', value: oldTopic},{name: 'New topic', value: newTopic})
    }
    if(oldChannel.nsfw !== newChannel.nsfw) channelChangedEmbed.addField('NSFW status changed', `From ${oldChannel.nsfw} to ${newChannel.nsfw}`)
    await logChannel.send({ embeds: [channelChangedEmbed] });
  }
}
