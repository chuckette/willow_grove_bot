const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Allows you to select roles'),
  async execute(interaction) {
    const row1 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('colors')
          .setPlaceholder('Color roles')
          .addOptions([
            {
              label: 'Ruby Red',
              description: 'Gives the red role',
              value: 'red',
            },
            {
              label: 'Agate Orange',
              description: 'Gives the orange role',
              value: 'orange',
            },
            {
              label: 'Sunstone Yellow',
              description: 'Gives the yellow role',
              value: 'yellow',
            },
            {
              label: 'Jade Green',
              description: 'Gives the green role',
              value: 'green',
            },
            {
              label: 'Topaz Blue',
              description: 'Gives the blue role',
              value: 'blue',
            },
            {
              label: 'Sapphire Purple',
              description: 'Gives the purple role',
              value: 'purple',
            },
            {
              label: 'Enstatite Brown',
              description: 'Gives the brown role',
              value: 'brown',
            },
            {
              label: 'Onyx Black',
              description: 'Gives the black role',
              value: 'black',
            },
            {
              label: 'Diamond White',
              description: 'Gives the white role',
              value: 'white',
            },
            {
              label: 'None',
              description: 'Removes color roles',
              value: 'none',
            },
          ])
      );
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('pronouns')
          .setPlaceholder('Pronoun roles')
          .addOptions([
            {
              label: 'She/Her',
              description: 'Gives the she/her role',
              value: 'she',
            },
            {
              label: 'They/Them',
              description: 'Gives the they/them role',
              value: 'they',
            },
            {
              label: 'He/Him',
              description: 'Gives the he/him role',
              value: 'he',
            },
            {
              label: 'None',
              description: 'Removes pronoun roles',
              value: 'none',
            },
          ])
        .setMaxValues(3)
      );
    const row3 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('gaymer')
          .setPlaceholder('Gaymer roles')
          .addOptions([
            {
              label: 'Gaymer',
              description: 'Gives the gaymer role',
              value: 'gaymer',
            },
            {
              label: 'Carders',
              description: 'Gives the carders role',
              value: 'carders',
            },
            {
              label: 'Tabletops',
              description: 'Gives the tabletops role',
              value: 'tabletops',
            },
            {
              label: 'None',
              description: 'Removes gaymer roles',
              value: 'none',
            },
          ])
        .setMaxValues(3)
      );
    await interaction.reply({content: 'User roles!', ephemeral: true, components: [row1, row2, row3]});
  },
};
