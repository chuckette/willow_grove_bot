const { guildId, modCommandPermissions } = require('../config.json');
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.guilds.fetch().then(guilds => {
      guilds.get(guildId).fetch().then(guild => {
        guild.commands.fetch().then(collection => {
          collection.forEach(command => {
            if(command.name === 'ban' || command.name === 'kick'){
              client.application.commands.permissions.set({
                command: command.id,
                guild: guildId,
                permissions: modCommandPermissions.permissions
              }).catch(console.log);
            }
          });
        });
        guild.channels.fetch().then(channels => {
          channels.forEach((channel) => {
            if (!channel.isText()) return;
            channel.messages.fetch({ limit: 50 })
              .catch(console.log);
          })
        }).catch(console.log);
        guild.members.fetch().then()
      }).catch(console.log)
    }).catch(console.log);
    console.log(Date() + ': Ready!');
  },
};
