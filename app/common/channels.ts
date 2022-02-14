import {Interaction, Message} from "discord.js";

const messages = require('../config/messages');
/**
 * @typedef {import('discord.js').Interaction} Interaction
 * @typedef {import('discord.js').Message} Message
 */


const requireNotThread = (model : Message | Interaction) => {
	if (model.channel?.isThread()) throw new Error(messages.inThreadError);
};


const isBotThread = (model : Message | Interaction) : boolean | undefined => {
	return model.channel?.isThread() && model.channel.ownerId === model.client.user?.id;
};


const requireBotThread = (model : Message | Interaction) => {
	if (!isBotThread(model)) throw new Error(messages.outThreadError);
};

module.exports = {
	isBotThread,
	requireNotThread,
	requireBotThread,
};
