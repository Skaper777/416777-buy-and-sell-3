'use strict';

const help = require(`./commands/help`);
const generate = require(`./commands/generate`);
const version = require(`./commands/version`);
const server = require(`./commands/server`);

module.exports.Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server
};
