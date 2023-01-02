from optparse import OptionParser

import boto3
from botocore.config import Config

from config import INSTANCE_CONFIG, IDENTITY_CONFIGS

if __name__ == '__main__':
    parser = OptionParser()
    # parser.add_option('-p', '--profile', dest='profile',
    #     help='The AWS credentials profile to use for the install')
    # parser.add_option('r', '--region', dest='region',
    #     help='The AWS region to create the Connect instance (overrides profile region)')
    # parser.add_option('-c', '--config', dest='config',
    #     help='A configuration file that specifies the Connect instance settings')
    # (options, args) = parser.parse_args()

    # Create SDK clients
    # config = Config(
    #     region_name=options.region
    # )

    print('Step 1: Set identity')
    for idx, id_config in enumerate(IDENTITY_CONFIGS):
        print(f"{idx+1}. {id_config['DISPLAY']}")
    choice = int(input("Choice: ")) - 1
    print(f"You chose {IDENTITY_CONFIGS[choice]['DISPLAY']}")