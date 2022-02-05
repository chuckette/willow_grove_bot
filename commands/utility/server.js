const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
  async execute(interaction) {
    // Variable definitions for async grabs that are needed multiple times
    let channels = await interaction.guild.channels.fetch().then((success) => success).catch(console.error);
    let categories = 0;
    let textChannels = 0;
    let voiceChannels = 0;
    // Count channel types
    channels.forEach((f) => {
      switch(f.type) {
        case 'GUILD_CATEGORY':
          categories++;
          break;
        case 'GUILD_TEXT':
          textChannels++;
          break;
        case 'GUILD_VOICE':
          voiceChannels++;
          break;
      }
    });
    // Get and sort roles
    let roles = await interaction.guild.roles.fetch().then((success) => success).catch(console.error);
    let rolesCount = roles.size;
    let rolesList = [];
    roles.forEach((value) => rolesList.push([value.name, value.position]));
    rolesList.sort((a,b) => {
      return b[1] - a[1];
    });
    rolesList = rolesList.map((element) => {
      return element[0];
    });
    rolesList = rolesList.join(', ');
    // Build the embed
    const serverInfoEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
          .setThumbnail(`${interaction.guild.iconURL()}`)
          .addFields(
            { name: 'Owner', value: await interaction.guild.fetchOwner().then((success) => success.user.tag).catch(console.error), inline: true },
            { name: 'Category Channels', value: categories.toString(), inline: true},
            { name: 'Text Channels', value: textChannels.toString(), inline: true},
            { name: 'Voice Channels', value: voiceChannels.toString(), inline: true},
            { name: 'Members', value: interaction.guild.memberCount.toString(), inline: true },
            { name: 'Roles', value: rolesCount.toString(), inline: true },
            { name: 'Role List', value: rolesList }
          )
      .setFooter({ text: `ID: ${interaction.guild.id} | Server Created: ${interaction.guild.createdAt.toLocaleDateString()})` })
    await interaction.reply({ embeds: [serverInfoEmbed] });
  },
};
