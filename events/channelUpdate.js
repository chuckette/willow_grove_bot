const { MessageEmbed } = require('discord.js');
const { guildId, logChannelId } = require('../config.json');
module.exports = {
	name: 'channelUpdate',
	async execute(oldChannel, newChannel) {
		const logChannel = await channel.guild.channels.fetch(logChannelId);
		const newChannelEmbed = new MessageEmbed()
					.setColor('#ffffff')
					.setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
					.setDescription(`**Channel created: #${channel.name}**`)
					.setFooter(`ID: ${channel.id}`)
					.setTimestamp();
		logChannel.send({ embeds: [newChannelEmbed] });

	}
}

