import {Client} from "discord.js";

const { DiscordEvent } = require('../models/events');

module.exports = new DiscordEvent('ready', true, (client : Client) => {
	console.log(`Ready! Logged in as ${client.user?.tag}`);
});