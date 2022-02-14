import {Intents} from "discord.js";

if (process.env.NODE_ENV != 'production') require('dotenv').config();

module.exports = {
	options: { intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	] },
	token: process.env.DISCORD_TOKEN,
}
