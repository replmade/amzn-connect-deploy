from pprint import pprint
import os
from botocore.exceptions import ClientError
from botocore.exceptions import WaiterError
from shared.util import Util


class Deployer:

    def run_create(self, instance_props, profile):
        # Write the JSON file the CDK script 'cdk-scripts-stack.js' will read
        Util.write_json_file(instance_props, './cdk-scripts/lib/instance-props.json')

        os.chdir('./cdk-scripts')
        # Bootstrap CDK with profile
        os.system(f'cdk bootstrap --profile {profile}')

        # Run cdk synth
        template_name = f"{instance_props['instanceAlias']}.yaml"
        synth_cmd = f'cdk synth > {template_name}'
        os.system(synth_cmd)

        # Deploy instance
        deploy_cmd = f'cdk deploy --profile {profile}'
        os.system(deploy_cmd)

        return True