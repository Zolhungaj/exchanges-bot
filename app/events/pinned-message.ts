import {Message} from "discord.js";

const { DiscordEvent } = require('../models/events');
/** @typedef {import('discord.js').Message} Message */

module.exports = new DiscordEvent('messageCreate', false, async (message : Message) => {
	if (message.author.id === message.client.user?.id
		&& message.type === 'CHANNEL_PINNED_MESSAGE') {
		return message.delete();
	}
});
