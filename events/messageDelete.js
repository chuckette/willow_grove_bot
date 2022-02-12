const { guildId, logChannelId, autoRoleId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'messageDelete',
  async execute(message) {
    const logChannel = await message.guild.channels.fetch(logChannelId);
    const deletedMessage = new MessageEmbed()
          .setColor('#ff0000')
          .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
          .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\r${message.content}`)
          .setFooter({text: `Author: ${message.author.id} | Message ID: ${message.id}`})
          .setTimestamp();
    logChannel.send({ embeds: [deletedMessage] });
  }
}
