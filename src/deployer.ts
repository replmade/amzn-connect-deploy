import { writeFileSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { CfnInstanceProps } from 'aws-cdk-lib/aws-connect';

const execAsync = promisify(exec);

async function runCommand(command: string) {
    try {
      const { stdout, stderr } = await execAsync(command);
      if (stdout) {
        console.log('Command output:', stdout);
      }
      if (stderr) {
        console.error('Command error:', stderr);
      }
      return true;
    } catch (error) {
      console.error('Error executing command:', error);
      return false;
    }
  }

// class Deployer:
export class Deployer {
    static async runCreate (
        cfnInstanceProps: CfnInstanceProps, 
        profile: string, 
        region: string): Promise<boolean> {
        let result: boolean = false;

        // Write the JSON file the CDK script 'cdk-scripts-stack.js' will read
        writeFileSync(
            './cdk-scripts/lib/instance-props.json', 
            JSON.stringify(cfnInstanceProps));

        process.chdir('./cdk-scripts');

        // Bootstrap CDK with profile
        result = await runCommand(
            `cdk bootstrap --profile ${profile}`)
        
        // Run cdk synth
        const templateName = `${cfnInstanceProps.instanceAlias}.yaml`;
        const synthCmd = `cdk synth > ${templateName}`;
        result = await runCommand(synthCmd);

        // Deploy instance
        const deployCmd = `cdk deploy --profile ${profile} --region ${region}`;
        result = await runCommand(deployCmd);

        return result;
    }
}

//     def run_create(self, instance_props, profile):
//         # Write the JSON file the CDK script 'cdk-scripts-stack.js' will read
//         Util.write_json_file(instance_props, './cdk-scripts/lib/instance-props.json')

//         os.chdir('./cdk-scripts')
//         # Bootstrap CDK with profile
//         os.system(f'cdk bootstrap --profile {profile}')

//         # Run cdk synth
//         template_name = f"{instance_props['instanceAlias']}.yaml"
//         synth_cmd = f'cdk synth > {template_name}'
//         os.system(synth_cmd)

//         # Deploy instance
//         deploy_cmd = f'cdk deploy --profile {profile}'
//         os.system(deploy_cmd)

//         return True