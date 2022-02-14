import {Client, Collection} from 'discord.js';
import {DiscordEvent} from "./models/events";

const { requireCommands } = require('./models/commands')(Collection);
const keyvs = require('./services/keyv');
const client : Client = require('./services/discord-client');


const commands = requireCommands(require('./commands')(keyvs));

const events : DiscordEvent[] = require('./events');
for (const event of events) {
	const callback = (event.once ? client.once : client.on).bind(client);
	callback(event.name, (...args) => event.execute(...args));
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand) return;
	const command = commands.get(interaction.commandName);
	if (!command) return;
	return command.run(interaction);
});

client.login().then(() => {
	console.log('successfully logged in')
});
