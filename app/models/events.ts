export class DiscordEvent {
	name : string
	once : boolean
	execute : Function
	constructor(name : string, once : boolean = false, execute : Function) {
		this.name = name;
		this.once = once;
		this.execute = execute;
	}
}

module.exports = { DiscordEvent };
