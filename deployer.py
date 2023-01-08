from pprint import pprint
import time
from botocore.exceptions import ClientError
from shared.util import Util

class Deployer:

    def run_create(self, client, config):
        # Check that the instance doesn't exist in this account/region
        instance_alias = config.InstanceAlias
        instance_list = client.list_instances()['InstanceSummaryList']
        found = False
        for inst in instance_list:
            if inst['InstanceAlias'] == instance_alias:
                found = True
                break
        if found:
            print(f"Instance {instance_alias} already exists.")
            return False

        try:
            resp = client.create_instance(**vars(config))

            instance_id = resp['Id']
            # Wait for instance creation to complete
            status = 'CREATION_IN_PROGRESS'
            while status == 'CREATION_IN_PROGRESS':
                print(f'Creating Connect Instance {config.InstanceAlias}...')
                time.sleep(15)
                resp = client.describe_instance(InstanceId=instance_id)
                status = resp['Instance']['InstanceStatus']

            if status == 'CREATION_FAILED':
                print('Connect instance creation failed.')
                return False

            return True

        except ClientError as error:
            # handle response
            print(['Error']['Message'])

        pprint(resp)
