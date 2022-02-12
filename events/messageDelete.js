const { guildId, logChannelId, autoRoleId } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    const logChannel = await message.guild.channels.fetch(logChannelId);
    var deletedMessage = new MessageEmbed()
      .setColor('#ff0000');
    if (!message.partial) {
      deletedMessage = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
        .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\r${message.content}`)
        .setFooter({text: `Author: ${message.author.id} | Message ID: ${message.id}`})
        .setTimestamp();
      if (message.attachments.size > 0) {
        message.attachments.forEach((attachment) => deletedMessage.addField('Attachment', attachment.url));
      }
    } else { if (message.author === null || message.author.bot) return;
    }
    logChannel.send({ embeds: [deletedMessage] });
  }
}
