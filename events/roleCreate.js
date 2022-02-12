const { logChannelId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'roleCreate',
  async execute(newRole) {
    if (newRole.partial) newRole.fetch();
    const logChannel = await newRole.guild.channels.fetch(logChannelId);
    var newRoleEmbed = new MessageEmbed()
      .setColor('#00ff00')
      .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
      .setDescription(`**Role created: ${newRole.name}**`)
      .setFooter({text: `ID: ${newRole.id}`})
      .setTimestamp();
    await logChannel.send({ embeds: [newRoleEmbed] });
  }
}
