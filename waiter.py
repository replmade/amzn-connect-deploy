import json
from pprint import pprint
import boto3
from botocore.waiter import create_waiter_with_client
from botocore.waiter import WaiterModel

def get_create_instance_waiter(connect_client):
    '''Returns a custom waiter for Amazon Connect create_instance'''

    f = open('waiter.json')
    waiter_config = json.load(f)
    f.close()

    waiter_model = WaiterModel(waiter_config)
    custom_waiter = create_waiter_with_client(
        'InstanceActive', 
        waiter_model, 
        connect_client
    )

    return custom_waiter