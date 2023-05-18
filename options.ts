import { program, OptionValues } from "commander";

export function getOptions(): OptionValues {
    program
        .option('-p, --profile <name>', 'The AWS credentials profile to use for the install', 'default')
        .option('-r, --region <name>', 'The AWS region to create the Connect instance (overrides profile region)', 'us-east-1')
        .option('-c, --config <filename>', 'A configuration file that specifies the Connect instance settings', '')
        .parse(process.argv);

    const options = program.opts();
    return options;
}   
