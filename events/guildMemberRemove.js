const { guildId, logChannelId, autoRoleId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const logChannel = await member.guild.channels.fetch(logChannelId);
    const userRoles = member._roles;
    const roles = await member.guild.roles.fetch();
    let userRolesList = []
    userRoles.forEach((role) => userRolesList.push([ roles.get(role).name, roles.get(role).position ]))
    userRolesList.sort((a,b) =>  { return b[1] - a[1] });
    let userRolesTyped = [];
    userRolesList.forEach((role) => userRolesTyped.push(role[0]));
    var removedUserEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setAuthor({ name: 'Member Left', iconURL: member.user.avatarURL() })
      .setDescription(`${member.user} ${member.user.tag}`)
      .setFooter({text: `ID: ${member.user.id}`})
      .setTimestamp();
    if (userRolesList.length !== 0) removedUserEmbed.addField('Roles', userRolesTyped.join(', '))
    logChannel.send({ embeds: [removedUserEmbed] });
  }
}
