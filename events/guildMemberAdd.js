const { logChannelId, autoRoleId } = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    await member.guild.fetch();
    const logChannel = await member.guild.channels.fetch(logChannelId);
    var february = (member.user.createdAt.getFullYear() % 4 === 0 && member.user.createdAt.getFullYear() % 100 !== 0) || member.user.createdAt.getFullYear() % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const now = new Date;
    let yearDif = now.getFullYear() - member.user.createdAt.getFullYear();
    let monthDif = now.getMonth() - member.user.createdAt.getMonth();
    let dayDif = now.getDate() - member.user.createdAt.getDate();
    if (monthDif < 0) {
      yearDif--;
      monthDif += 12;
    }
    if (dayDif < 0) {
      if (monthDif > 0) {
        monthDif--;
      } else {
        yearDif--;
        monthDif = 11;
      }
      dayDif += daysInMonth[user.createdAt.getMonth()];
    }
    const dateDif = `${yearDif} years, ${monthDif} months, ${dayDif} days`;
    await member.roles.add(autoRoleId);
    const newChannelEmbed = new MessageEmbed()
      .setColor('#00ff00')
      .setAuthor({ name: 'Member Joined', iconURL: member.user.avatarURL() })
      .setDescription(`${member.user} ${member.user.tag}`)
      .addField('Account Created', dateDif)
      .setFooter({text: `ID: ${member.user.id}`})
      .setTimestamp();
    logChannel.send({ embeds: [newChannelEmbed] });
  }
}
