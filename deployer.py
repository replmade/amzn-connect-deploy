from pprint import pprint
import os
import time
from botocore.exceptions import ClientError
from botocore.exceptions import WaiterError
from shared.util import Util
from waiter import get_create_instance_waiter


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
        # Check that the instance doesn't exist in this account/region
        # instance_alias = config.InstanceAlias
        # instance_list = client.list_instances()['InstanceSummaryList']
        # found = False
        # for inst in instance_list:
        #     if inst['InstanceAlias'] == instance_alias:
        #         found = True
        #         break
        # if found:
        #     print(f"Instance {instance_alias} already exists.")
        #     return False
        
        # try:
        #     resp = client.create_instance(**vars(config))
        #     instance_id = resp['Id']
        #     instance_active_waiter = get_create_instance_waiter(client)
        #     instance_active_waiter.wait(InstanceId=instance_id)

            # Wait for instance creation to complete
            # status = 'CREATION_IN_PROGRESS'
            # while status == 'CREATION_IN_PROGRESS':
            #     print(f'Creating Connect Instance {config.InstanceAlias}...')
            #     time.sleep(15)
            #     resp = client.describe_instance(InstanceId=instance_id)
            #     status = resp['Instance']['InstanceStatus']

            # if status == 'CREATION_FAILED':
            #     print('Connect instance creation failed.')
            #     return False

        return True

        # except ClientError as error:
        #     # handle response
        #     print(['Error']['Message'])
        # except WaiterError as e:
        #     pprint(e)

        #     return False

        # pprint(resp)
