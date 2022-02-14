import {config} from "dotenv";
import {Client} from "discord.js";

const client : Client = require('../services/discord-client');
const { registerGuildCommands } = require('../utilities/register-commands');
if (process.env.NODE_ENV != 'production') config();

const guildId : string | undefined = process.env.GUILD_ID;

client.login()
	.then(() => registerGuildCommands(client, guildId))
	.then(() => client.destroy());
