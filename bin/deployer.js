"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployer = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function runCommand(command) {
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stdout) {
            console.log('Command output:', stdout);
        }
        if (stderr) {
            console.error('Command error:', stderr);
        }
        return true;
    }
    catch (error) {
        console.error('Error executing command:', error);
        return false;
    }
}
// class Deployer:
class Deployer {
    static async runCreate(cfnInstanceProps, profile, region) {
        let result = false;
        // Write the JSON file the CDK script 'cdk-scripts-stack.js' will read
        (0, fs_1.writeFileSync)('./cdk-scripts/lib/instance-props.json', JSON.stringify(cfnInstanceProps));
        process.chdir('./cdk-scripts');
        // Bootstrap CDK with profile
        console.log('Bootstrapping CDK');
        result = await runCommand(`cdk bootstrap --profile ${profile}`);
        console.log('Bootstrap result:');
        console.log(result);
        // Run cdk synth
        const templateName = path.join('../', `${cfnInstanceProps.instanceAlias}.yaml`);
        const synthCmd = `cdk synth > ${templateName}`;
        result = await runCommand(synthCmd);
        // Deploy instance
        const deployCmd = `cdk deploy --profile ${profile} --region ${region}`;
        result = await runCommand(deployCmd);
        return result;
    }
}
exports.Deployer = Deployer;
