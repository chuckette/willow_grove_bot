module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isCommand()) {

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        command.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    } else if (interaction.isSelectMenu()) {
      console.log(interaction);
      switch (interaction.customId) {
        case 'colors':
          console.log(interaction.values);
          interaction.update({ content: `You picked: ${interaction.values}` })
          break;
        case 'pronouns':
          console.log(interaction.values);
          interaction.update({ content: `You picked: ${interaction.values}` })
          break;
        case 'gaymer':
          console.log(interaction.values);
          interaction.update({ content: `You picked: ${interaction.values}` })
          break;
      }
    }
	},
};
