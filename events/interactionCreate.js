const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const { userRoles } = require('../config.json');

function toMap(array) {
  const map = new Map();
  for(const entry of array) map.set(entry[0], entry[1]);
  return map;
}

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
    } else

    if (interaction.isSelectMenu()) {
      // Define maps for the roles
      const colorMap = new Map(userRoles.colors);
      const gaymerMap = new Map(userRoles.gaymers);
      const pronounMap = new Map(userRoles.pronouns);
      // Handle the selections
      let user = await interaction.guild.members.fetch(interaction.user.id);
      let removeRoles = [];
      let addedRoles = [];
      switch (interaction.customId) {
        case 'colors':
          //const colorMap = new Map(JSON.parse(colors));
          //console.log(colorMap);
          interaction.update({ content: `You picked: ${interaction.values}` });
          for (var [key, entry] of colorMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          addedRoles.push(colorMap.get(interaction.values[0]));
          break;
        case 'pronouns':
          interaction.update({ content: `You picked: ${interaction.values}` })
          for (var [key, entry] of pronounMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          interaction.values.forEach((key) => addedRoles.push(pronounMap.get(key)));
          break;
        case 'gaymer':
          interaction.update({ content: `You picked: ${interaction.values}` })
          for (var [key, entry] of gaymerMap) {
            if (user.roles.cache.has(entry)) {
              removeRoles.push(entry);
            }
          }
          interaction.values.forEach((key) => addedRoles.push(gaymerMap.get(key)));
          break;
      }
      await user.roles.remove(removeRoles);
      if (interaction.values[0] === 'none') return;
      await user.fetch()
      await user.roles.add(addedRoles);
    }
  },
};
