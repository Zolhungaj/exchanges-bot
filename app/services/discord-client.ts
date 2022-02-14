import {Client} from "discord.js";

const { options, token } = require('../config/discord-client');


export const client : Client = new Client(options);
client.token = token;

module.exports = client;
