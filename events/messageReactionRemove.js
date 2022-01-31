const { guildId, logChannelId } = require('../config.json');
module.exports = {
	name: 'messageReactionRemove',
	async execute(messageReaction, user) {
		// console.log(`Reaction removed`);
		// const logChannel = await channel.guild.channels.fetch(logChannelId);
		console.log(messageReaction);
		// console.log(user);
		// const newChannelEmbed = new MessageEmbed()
		// 			.setColor('#ffffff')
		// 			.setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
		// 			.setDescription(`**Channel created: #${channel.name}**`)
		// 			.setFooter(`ID: ${channel.id}`)
		// 			.setTimestamp();
		// logChannel.send({ embeds: [newChannelEmbed] });
	}
}
