const { guildId, logChannelId, autoRoleId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage) {
    if (newMessage.member === null || newMessage.member.user.bot) return;
    const logChannel = await newMessage.guild.channels.fetch(logChannelId);
    let editedMessage = new MessageEmbed()
      .setColor('#0000ff')
      .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.avatarURL() })
      .setDescription(`**Message edited in ${newMessage.channel}** [Jump to message](${newMessage.url})`)
      .setFooter({text: `Author: ${newMessage.author.id}`})
      .setTimestamp();
    if (oldMessage.partial) return;
    (oldMessage.content === null) ? editedMessage.addField('Before', 'Unable to read old message') : ((oldMessage.content.length > 512) ? editedMessage.addField('Before', oldMessage.content.substring(0,512) + '...') : editedMessage.addField('Before', oldMessage.content))
    if (newMessage.partial) newMessage.fetch();
    if (newMessage.content === oldMessage.content) return;
    (newMessage.content.length > 512) ? editedMessage.addField('After', newMessage.content.substring(0,512) + '...') : editedMessage.addField('After', newMessage.content)
    logChannel.send({ embeds: [editedMessage] });
  }
}
