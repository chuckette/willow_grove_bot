const { logChannelId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'roleUpdate',
  async execute(oldRole, newRole) {
    const logChannel = await newRole.guild.channels.fetch(logChannelId);
    await newRole.guild.fetch();
    if (oldRole.name !== newRole.name) {
      var nicknameChangedEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
        .setDescription(`**${newRole} name changed**`)
        .setFooter({text: `ID: ${newRole.id}`})
        .setTimestamp();
      if (oldRole.name !== null) nicknameChangedEmbed.addField('Before', oldRole.name)
        nicknameChangedEmbed.addField('After', newRole.name)
      await logChannel.send({ embeds: [nicknameChangedEmbed] });
    }
  }
}
