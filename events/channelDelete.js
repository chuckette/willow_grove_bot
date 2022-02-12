const { MessageEmbed } = require('discord.js');
const { guildId, logChannelId } = require('../config.json');
module.exports = {
  name: 'channelDelete',
  async execute(channel) {
    const logChannel = await channel.guild.channels.fetch(logChannelId);
    const newChannelEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
      .setDescription(`**Channel deleted: #${channel.name}**`)
      .setFooter(`ID: ${channel.id}`)
      .setTimestamp();
    logChannel.send({ embeds: [newChannelEmbed] });
  }
}
