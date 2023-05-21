"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const commander_1 = require("commander");
function getOptions() {
    commander_1.program
        .option('-p, --profile <name>', 'The AWS credentials profile to use for the install', 'default')
        .option('-r, --region <name>', 'The AWS region to create the Connect instance (overrides profile region)', 'us-east-1')
        .option('-c, --config <filename>', 'A configuration file that specifies the Connect instance settings', '')
        .parse(process.argv);
    const options = commander_1.program.opts();
    return options;
}
exports.getOptions = getOptions;
