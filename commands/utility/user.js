const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
				.setName('user')
				.setDescription('Replies with user info!')
				.addUserOption(option => 
					option.setName('user')
								.setDescription('Target user')),
	async execute(interaction) {
		let user = interaction.options.getUser('user');
		if (user == null) {
			user = interaction.user;
		}
		user = await user.fetch(true);
		let userRoles = await interaction.guild.members.fetch(user.id).then((success) => success._roles);
		let userRolesList = []
		const roles = await interaction.guild.roles.fetch();
		userRoles.forEach((role) => userRolesList.push([ roles.get(role).name, roles.get(role).position ]))
		userRolesList.sort((a,b) =>  { return b[1] - a[1] });
		let userRolesTyped = [];
		userRolesList.forEach((role) => userRolesTyped.push(role[0]));
		const userInfoEmbed = new MessageEmbed()
					.setColor(user.accentColor)
					.setAuthor({ name: user.username.toString(), iconURL: user.avatarURL() })
					.setThumbnail(user.bannerURL())
					.addFields(
						{ name: 'User ID', value: user.id, inline: true },
						{ name: 'Created', value: user.createdAt.toLocaleDateString(), inline: true },
						{ name: 'Roles', value: userRolesTyped.join(', ') }
					)
		await interaction.reply({ embeds: [userInfoEmbed] });
	},
};
