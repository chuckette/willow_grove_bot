const { logChannelId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'roleDelete',
  async execute(oldRole) {
    const logChannel = await oldRole.guild.channels.fetch(logChannelId);
    var oldRoleEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setAuthor({ name: oldRole.guild.name, iconURL: oldRole.guild.iconURL() })
      .setDescription(`**Role deleted: ${oldRole.name}**`)
      .setFooter({text: `ID: ${oldRole.id}`})
      .setTimestamp();
    await logChannel.send({ embeds: [oldRoleEmbed] });
  }
}
