const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const pingEmbed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle('Ping')
      .setDescription('Pong!');
    await interaction.reply({ embeds: [pingEmbed], ephemeral: true });
    // channel.send({ embeds: [pingEmbed] });
  },
};
