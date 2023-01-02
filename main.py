from optparse import OptionParser
from getpass import getpass
from pprint import pprint

import boto3
from botocore.config import Config

from config import INSTANCE_CONFIG, IDENTITY_CONFIGS

def set_user_type():
    print('\nSet identity management')
    for id_config in IDENTITY_CONFIGS:
        print(f"{id_config['ORDINAL']}. {id_config['DISPLAY']}")
    choice_input = input("Choice: ")
    if choice_input not in [c['ORDINAL'] for c in IDENTITY_CONFIGS]:
        print('\nPlease select a number in the range of choices.\n')
        return None
    id_choice = [c for c in IDENTITY_CONFIGS if c['ORDINAL'] == choice_input][0]
    print(f"You chose {id_choice['DISPLAY']}")
    confirm = input("Is this correct? [N/y]: ")
    if confirm.lower() == 'y':
        return id_choice
    
    return None

def set_instance_alias():
    print('\nChoose the instance alias for your instance')
    print('This will set your instance URL to <instance-alias>.my.connect.aws')
    alias_name = input("Enter an instance alias: ")
    confirm = input(f"You chose {alias_name.lower()}.my.connect.aws. Is this correct? [N/y]: ")
    if confirm.lower() == 'y':
        return alias_name.lower()
    return None

def set_use_admin():
    use_admin = input("\nWould you like to set an admin for the instance? [N/y]: ")
    return use_admin

def set_admin_fields():
    print("\nEnter the following fields for the Administrator: ")
    if INSTANCE_CONFIG["IDENTITY_TYPE"]["CHOICE"] == "CONNECT_MANAGED":
        confirmed = "n"
        ADMIN_FIELDS = INSTANCE_CONFIG["IDENTITY_TYPE"]["ADMIN_FIELDS"]
        while confirmed.lower() == "n":
            ADMIN_FIELDS["FIRSTNAME"] = input("First Name: ")
            ADMIN_FIELDS["LASTNAME"] = input("Last Name: ")
            ADMIN_FIELDS["USERNAME"] = input("Username: ")
            confirmed = input(f"""You entered:
    First name: {ADMIN_FIELDS["FIRSTNAME"]}
    Last name: {ADMIN_FIELDS["LASTNAME"]}
    Username: {ADMIN_FIELDS["USERNAME"]}
Is this correct? [N/y]: """)
        password = "a"
        vpassword = "b"
        while password != vpassword:
            password = getpass("Password: ")
            vpassword = getpass("Verify password: ")
            if password != vpassword:
                print("Passwords do not match")
            else:
                ADMIN_FIELDS["PASSWORD"] = password
                ADMIN_FIELDS["PASSWORD_VERIFY"] = vpassword
        return

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option('-p', '--profile', dest='profile', default="default",
        help='The AWS credentials profile to use for the install')
    parser.add_option('-r', '--region', dest='region', default="us-east-1",
        help='The AWS region to create the Connect instance (overrides profile region)')
    parser.add_option('-c', '--config', dest='config', default=None,
        help='A configuration file that specifies the Connect instance settings')
    (options, args) = parser.parse_args()

    # Create SDK clients
    config = Config(
        region_name=options.region
    )

    user_type = None
    instance_alias = None
    use_admin = False
    admin_fields = None

    if not options.config:
        # Get the IdentityManagementType for the instance from user input
        while not user_type:
            user_type = set_user_type()
        # Add to the instance config dictionary
        INSTANCE_CONFIG["IDENTITY_TYPE"] = user_type
        # pprint(INSTANCE_CONFIG)

        # Get the admin info for the instance if the user chooses to set an admin
        use_admin = set_use_admin()

        if use_admin.lower() == 'y':
            admin_fields = set_admin_fields()


        # Get the instance alias for the instance URL from user input
        while not instance_alias:
            instance_alias = set_instance_alias()
        # Add to the instance config dictionary
        INSTANCE_CONFIG["InstanceAlias"] = instance_alias

        # pprint(INSTANCE_CONFIG)


