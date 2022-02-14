import {SlashCommandBuilder, SlashCommandSubcommandBuilder} from "@discordjs/builders";
import {CommandInteraction, Collection} from "discord.js";

	/**
	 * @typedef {import('@discordjs/builders').SlashCommandBuilder} SlashCommandBuilder
	 * @typedef {import('@discordjs/builders').SlashCommandSubcommandBuilder} SlashCommandSubcommandBuilder
	 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
	 * @typedef {import('discord.js').Collection} Collection
	 */

	/**
	 * @callback CommandCallback
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<any>}
	 */

	/**
	 * @callback RequireCallback
	 * @param {Command}
	 * @returns {void}
	 */

export class DiscordCommand {
	data : SlashCommandBuilder
	execute : Function | null
	constructor(data : SlashCommandBuilder , execute : Function | null = null) {
		this.data = data;
		this.execute = execute;
	}

	/**
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async run(interaction : CommandInteraction) : Promise<void> {
		if (this.execute) {
			return this.execute(interaction)
				.catch((err: Error) => this.error(interaction, err));
		}
	}

	/**
	 * @param {CommandInteraction} interaction
	 * @param err
	 * @returns {Promise<void>}
	 */
	async error(interaction : CommandInteraction, err : Error) : Promise<void> {
		return interaction.reply({
			content: err.message,
			ephemeral: true,
		})
			.then(() => console.error(err));
	}
}

export class DiscordParentCommand extends DiscordCommand {
	/**
	 * @param {SlashCommandBuilder|SlashCommandSubcommandBuilder} data
	 * @param {CommandCallback} execute
	 * @param {Array<Command>} subcommands
	 */
	subcommands : Collection<string, DiscordCommand>
	constructor(data : SlashCommandBuilder, execute : Function | null = null, subcommands : Array<DiscordCommand> | null = null) {
		super(data, execute);
		const callback = (command : DiscordCommand) => this.data.addSubcommand(command.data);
		this.subcommands = requireCommands(subcommands, callback);
	}

	/**
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async run(interaction : CommandInteraction) {
		if (!interaction.options.getSubcommand(false)) return;
		const subcommand = this.subcommands.get(interaction.options.getSubcommand());
		if (!subcommand) return;
		return subcommand.execute?.(interaction)
			.catch((err : Error) => super.error(interaction, err));
	}
}

	/**
	 * @param {Array<Command>} commands
	 * @param {RequireCallback} callback
	 * @returns {Collection<string, DiscordCommand>}
	 */
export function requireCommands(commands : Array<DiscordCommand>, callback : Function | null = null) : Collection<string, DiscordCommand> {
	/** @type {Collection<string, DiscordCommand>} */
	const collection = new Collection<string, DiscordCommand>();
	for (const command of commands) {
		if (callback) callback(command);
		collection.set(command.data.name, command);
	}
	return collection;
}
module.exports =  {

		DiscordCommand,
		DiscordParentCommand,
		requireCommands,
};
