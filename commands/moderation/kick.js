const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { logChannelId } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option =>
              option.setName('target')
                    .setDescription('Target user')
                    .setRequired(true))
        .addStringOption(option =>
              option.setName('reason')
                    .setDescription('Kick reason'))
        .setDefaultPermission(false),
  async execute(interaction) {
    const user = await interaction.guild.members.fetch(await interaction.user.fetch());
    const logChannel = await interaction.guild.channels.fetch(logChannelId);
    const target = await interaction.guild.members.fetch(interaction.options.getUser('target')).catch(() => {interaction.reply({content: 'Unable to locate user!', ephemeral: true}); return;});
    if (target === undefined) return;
    if (!interaction.memberPermissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.KICK_MEMBERS]) || user.roles.highest.position <= target.roles.highest.position) {
      logChannel.send({ embeds: [await buildPermissionFailEmbed(user,target)] });
      interaction.reply({content: 'You can\'t kick them!', ephemeral: true})
      return;
    }
    const reason = (interaction.options.getString('reason') === null) ? "None provided" : interaction.options.getString('reason');
    interaction.guild.members.kick(target, reason);
    kickEmbed = await buildKickEmbed(await target.user.fetch(), reason);
    await interaction.reply({ embeds: [kickEmbed], ephemeral: true });
    logChannel.send({ embeds: [kickEmbed.addField('Banner', user.user.tag, true)] })
  }
};

async function buildKickEmbed(kickedUser, reason="None provided") {
  const kickedUserEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Kicked!')
        .setThumbnail(kickedUser.bannerURL())
        .addFields(
          { name: 'User', value: kickedUser.username.toString(), inline: true },
          { name: 'User ID', value: kickedUser.id, inline: true },
          { name: 'Reason', value: reason }
        );
  return kickedUserEmbed;
}

async function buildPermissionFailEmbed(user, target) {
  const permissionFailEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Permission failure!')
        .setDescription(user.user.tag + '(' + user.nickname + ') tried kicking ' + target.user.tag + '(' + user.nickname + ')')
        .setTimestamp();
  return permissionFailEmbed;
}
