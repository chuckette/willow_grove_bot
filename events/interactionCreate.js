const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
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
      // Define maps for the roles
      const colorMap = new Map();
      colorMap.set('red', '936629975463911464');
      colorMap.set('orange', '936630115381706773');
      colorMap.set('yellow', '936630328330682389');
      colorMap.set('green', '936630404394418217');
      colorMap.set('blue', '936630524120817724');
      colorMap.set('purple', '936630779541348404');
      colorMap.set('brown', '938853312969728030');
      colorMap.set('black', '936630878002626631');
      colorMap.set('white', '936631046496206918');
      const gaymerMap = new Map();
      gaymerMap.set('gaymer', '936619867510038549');
      gaymerMap.set('carders', '936628863461650452');
      gaymerMap.set('tabletops', '936628791801937991');
      const pronounMap = new Map();
      pronounMap.set('she', '936614714132275201');
      pronounMap.set('they', '936614643760250923');
      pronounMap.set('he', '936612642154504232');
      // Handle the selections
      let user = await interaction.guild.members.fetch(interaction.user.id);
      switch (interaction.customId) {
        case 'colors':
          interaction.update({ content: `You picked: ${interaction.values}` });
          removeRoles = [];
          for (var [key, entry] of colorMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          await user.roles.remove(removeRoles);
          if (interaction.values[0] === 'none') return;
          await user.fetch()
          await user.roles.add([colorMap.get(interaction.values[0])]);
          break;
        case 'pronouns':
          interaction.update({ content: `You picked: ${interaction.values}` })
          removeRoles = [];
          for (var [key, entry] of pronounMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          await user.roles.remove(removeRoles);
          await user.fetch();
          if (interaction.values[0] === 'none') return;
          addedRoles = []
          interaction.values.forEach((key) => addedRoles.push(pronounMap.get(key)));
          await user.roles.add(addedRoles);
          break;
        case 'gaymer':
          interaction.update({ content: `You picked: ${interaction.values}` })
          removeRoles = [];
          for (var [key, entry] of gaymerMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          await user.roles.remove(removeRoles);
          if (interaction.values[0] === 'none') return;
          await user.fetch();
          addedRoles = []
          interaction.values.forEach((key) => addedRoles.push(gaymerMap.get(key)));
          await user.roles.add(addedRoles);
          break;
      }
    }
  },
};
