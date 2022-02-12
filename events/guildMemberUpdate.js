const { logChannelId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'guildMemberUpdate',
  async execute(oldMember, newMember) {
    const logChannel = await newMember.guild.channels.fetch(logChannelId);
    await newMember.guild.fetch();
    if (oldMember.nickname !== newMember.nickname) {
      var nicknameChangedEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.avatarURL() })
        .setDescription(`**${newMember} nickname changed**`)
        .setFooter({text: `ID: ${newMember.user.id}`})
        .setTimestamp();
      if (oldMember.nickname !== null) nicknameChangedEmbed.addField('Before', oldMember.nickname)
        nicknameChangedEmbed.addField('After', newMember.nickname)
      await logChannel.send({ embeds: [nicknameChangedEmbed] });
    }
    if (oldMember._roles !== newMember._roles) {
      const newRoles = newMember._roles.filter((role) => {return !oldMember._roles.includes(role)});
      const oldRoles = oldMember._roles.filter((role) => {return !newMember._roles.includes(role)});
      var rolesChangedEmbed = new MessageEmbed()
        .setColor('#0000ff')
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.avatarURL() })
        .setDescription(`**${newMember} role change**`)
        .setFooter({text: `ID: ${newMember.user.id}`})
        .setTimestamp();
      var newRolesString = [];
      var oldRolesString = [];
      await newRoles.forEach((role) => newMember.guild.roles.fetch(role).then((role) => newRolesString.push('\`' + role.name + '\`')));
      await oldRoles.forEach((role) => oldMember.guild.roles.fetch(role).then((role) => oldRolesString.push('\`' + role.name + '\`')).catch(console.log('error')));
      if (newRolesString.length !== 0) rolesChangedEmbed.addField('Roles added', newRolesString.join(', '))
      if (oldRolesString.length !== 0) rolesChangedEmbed.addField('Roles removed', oldRolesString.join(', '))
      await logChannel.send({ embeds: [rolesChangedEmbed] });
    }
  }
}
