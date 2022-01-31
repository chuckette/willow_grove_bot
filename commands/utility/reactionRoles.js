const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { reactRolesChannelId } = require('../../config.json');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

module.exports = {
	// Define the *huge* slash command
	data: new SlashCommandBuilder()
				.setName('reactionroles')
				.setDescription('Builds reaction roles')
				.addStringOption(option =>
					option.setName('id')
								.setDescription('Message ID for the reaction message')
								.setRequired(true))
				.addStringOption(option =>
					option.setName('reaction1')
								.setDescription('Emote reaction 1')
								.setRequired(true))
				.addRoleOption(option =>
					option.setName('role1')
								.setDescription('Role 1')
								.setRequired(true))
				.addStringOption(option =>
					option.setName('reaction2')
								.setDescription('Emote reaction 2'))
				.addRoleOption(option =>
					option.setName('role2')
								.setDescription('Role 2'))
				.addStringOption(option =>
					option.setName('reaction3')
								.setDescription('Emote reaction 3'))
				.addRoleOption(option =>
					option.setName('role3')
								.setDescription('Role 3'))
				.addStringOption(option =>
					option.setName('reaction4')
								.setDescription('Emote reaction 4'))
				.addRoleOption(option =>
					option.setName('role4')
								.setDescription('Role 4'))
				.addStringOption(option =>
					option.setName('reaction5')
								.setDescription('Emote reaction 5'))
				.addRoleOption(option =>
					option.setName('role5')
								.setDescription('Role 5'))
				.addStringOption(option =>
					option.setName('reaction6')
								.setDescription('Emote reaction 6'))
				.addRoleOption(option =>
					option.setName('role6')
								.setDescription('Role 6'))
				.addStringOption(option =>
					option.setName('reaction7')
								.setDescription('Emote reaction 7'))
				.addRoleOption(option =>
					option.setName('role7')
								.setDescription('Role 7'))
				.addStringOption(option =>
					option.setName('reaction8')
								.setDescription('Emote reaction 8'))
				.addRoleOption(option =>
					option.setName('role8')
								.setDescription('Role 8')),
	async execute(interaction) {
		// Get the message in question
		const roleMessage = await interaction.guild.channels.fetch(reactRolesChannelId).then((rolesChannel) => rolesChannel.messages.fetch(interaction.options.getString('id')).catch(() => {interaction.reply("Invalid ID!"); return})).catch(() => {interaction.reply("No roles channel set up!"); return});

		// Confirm reactions are paired with roles
		let reacts = [interaction.options.getString('reaction1')];
		if (interaction.options.getString('reaction2') !== null && interaction.options.getRole('role2') !== null) {
			reacts.push(interaction.options.getString('reaction2'))
			if (interaction.options.getString('reaction3') !== null && interaction.options.getRole('role3') !== null) {
			reacts.push(interaction.options.getString('reaction3'))
				if (interaction.options.getString('reaction4') !== null && interaction.options.getRole('role4') !== null) {
				reacts.push(interaction.options.getString('reaction4'))
					if (interaction.options.getString('reaction5') !== null && interaction.options.getRole('role5') !== null) {
					reacts.push(interaction.options.getString('reaction5'))
						if (interaction.options.getString('reaction6') !== null && interaction.options.getRole('role6') !== null) {
						reacts.push(interaction.options.getString('reaction6'))
							if (interaction.options.getString('reaction7') !== null && interaction.options.getRole('role7') !== null) {
								reacts.push(interaction.options.getString('reaction7'))
								if (interaction.options.getString('reaction8') !== null && interaction.options.getRole('role8') !== null) {
									reacts.push(interaction.options.getString('reaction8'))
								}
							}
						}
					}
				}
			}
		}
		// Add the reactions
		await interaction.reply('Adding reactions...');
		for (react of reacts) {
			try {
				roleMessage.react(react).catch(console.error);
				await sleep(1000);
				await roleMessage.react(react).catch(console.error);
			} catch {
				interaction.reply(`Invalid emote! (${react})`)
				return;
			}
		}
		console.log('done');
		await interaction.editReply('Reactions added!');
		// message.react('👍').then(() => message.react('👎'));

		// const filter = (reaction, user) => {
		// 	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		// };

		// message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
		// 	.then(collected => {
		// 		const reaction = collected.first();

		// 		if (reaction.emoji.name === '👍') {
		// 			message.reply('You reacted with a thumbs up.');
		// 		} else {
		// 			message.reply('You reacted with a thumbs down.');
		// 		}
		// 	})
		// 	.catch(collected => {
		// 		message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
		// 	});
		//



		// const pingEmbed = new MessageEmbed()
		// 			.setColor('#ffffff')
		// 			.setTitle('Ping')
		// 			.setDescription('Pong!');
		// await interaction.reply( "test" );
	},
};
