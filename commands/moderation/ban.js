const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { logChannelId } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user')
        .addSubcommand(subcommand =>
          subcommand.setName('user')
                .setDescription('Targets a user by name')
                .addUserOption(option =>
                      option.setName('target')
                            .setDescription('Target user')
                            .setRequired(true))
                .addStringOption(option =>
                      option.setName('reason')
                            .setDescription('Ban reason')))
        .addSubcommand(subcommand =>
          subcommand.setName('id')
                .setDescription('Targets a user by ID')
                .addStringOption(option =>
                      option.setName('target')
                            .setDescription('Target user ID')
                            .setRequired(true))
                .addStringOption(option =>
                      option.setName('reason')
                            .setDescription('Ban reason')))
        .setDefaultPermission(false),
  async execute(interaction) {
    const user = await interaction.guild.members.fetch(await interaction.user.fetch());
    const logChannel = await interaction.guild.channels.fetch(logChannelId);
    const target = (interaction.options.getSubcommand() === 'user') ? await interaction.guild.members.fetch(await interaction.options.getUser('target')) : await interaction.guild.members.fetch(await interaction.options.getString('target'));
    if (target === undefined) {
      await interaction.reply({content: 'Unable to locate user!', ephemeral: true});
    }
    if (!interaction.memberPermissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS]) || user.roles.highest.position <= target.roles.highest.position) {
      logChannel.send({ embeds: [await buildPermissionFailEmbed(user,target)] });
      interaction.reply({content: 'You can\'t ban them!', ephemeral: true})
      return;
    }
    const reason = (interaction.options.getString('reason') === null) ? "None provided" : interaction.options.getString('reason');
    console.log(target);
    interaction.guild.members.ban(target, {reason: reason});
    banEmbed = await buildBanEmbed(await target.user.fetch(), reason);
    await interaction.reply({ embeds: [banEmbed], ephemeral: true });
    logChannel.send({ embeds: [banEmbed.addField('Banner', user.user.tag, true)] })
  }
};

async function buildBanEmbed(bannedUser, reason="None provided") {
  const bannedUserEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Banned!')
        .setThumbnail(bannedUser.bannerURL())
        .addFields(
          { name: 'User', value: bannedUser.username.toString(), inline: true },
          { name: 'User ID', value: bannedUser.id, inline: true },
          { name: 'Reason', value: reason }
        );
  return bannedUserEmbed;
}

async function buildPermissionFailEmbed(user, target) {
  const permissionFailEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Permission failure!')
        .setDescription(user.user.tag + '(' + user.nickname + ') tried banning ' + target.user.tag + '(' + user.nickname + ')')
        .setTimestamp();
  return permissionFailEmbed;
}
