from pprint import pprint
import os
from botocore.exceptions import ClientError
from botocore.exceptions import WaiterError
from shared.util import Util


class Deployer:

    def run_create(self, instance_props, profile):
        # Write the JSON file the CDK script 'cdk-scripts-stack.js' will read
        Util.write_json_file(instance_props, './cdk-scripts/lib/instance-props.json')

        # Run cdk synth
        template_name = f"{instance_props['instanceAlias']}.yaml"
        synth_cmd = f'cdk synth > {template_name}'
        os.chdir('./cdk-scripts')
        synth_resp = os.system(synth_cmd)
        print(synth_resp)

        deploy_cmd = f'cdk deploy --profile {profile}'
        deploy_resp = os.system(deploy_cmd)
        print(deploy_resp)

        return True