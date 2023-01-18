from getpass import getpass
from shared.util import Util
from shared.enums import IdentityManagementType

class Guide:

    def choose_user_type(self):
        print('\nSet identity management')
        for id_type in IdentityManagementType:
            print(f'{id_type.value}. {id_type.name}')
        answer = input('Choice (number): ')
        if Util.empty_or_none(answer):
            return None
        if answer[0] not in IdentityManagementType.list():
            print('\nPlease select a number in the range of choices.\n')
            return None
        choice = IdentityManagementType(answer[0])
        print(f'You chose {choice.name}')
        confirm = Util.confirm_choice('Is this correct?')
        if confirm:
            return choice
        return None

    def choose_instance_alias(self):
        print('\nChoose the instance alias for your instance')
        print('This will set your instance URL to <instance-alias>.my.connect.aws')
        alias_name = input("Enter an instance alias: ")
        if Util.empty_or_none(alias_name):
            return None
        confirm = Util.confirm_choice(f"You chose {alias_name.lower()}.my.connect.aws. Is this correct?")
        if confirm:
            return alias_name.lower()
        return None

    def choose_directory_id(self):
        directory_id = input('\nEnter the AWS Directory Service directory id to manage your users: ')
        if Util.empty_or_none(directory_id):
            return None
        confirm = Util.confirm_choice(f"You entered {directory_id}. Is this correct?")
        if confirm:
            return directory_id
        return None

    def choose_outbound_calls(self):
        allow_outbound_calls = Util.check_yes('\nEnable outbound calls?')
        confirm = Util.confirm_choice(f"You entered {'yes' if allow_outbound_calls else 'no'}. Is this correct?")
        if confirm:
            return allow_outbound_calls
        return None

    def choose_inbound_calls(self):
        allow_inbound_calls = Util.check_yes('\nEnable inbound calls?')
        confirm = Util.confirm_choice(f"You entered {'yes' if allow_inbound_calls else 'no'}. Is this correct?")
        if confirm:
            return allow_inbound_calls
        return None

    def get_create_options(self):
        instance_props = {}
        instance_attributes = {}

        # instance_config = InstanceConfig()
        # Get the IdentityManagementType for the instance from user input
        user_type = None
        while not user_type:
            user_type = self.choose_user_type()
        instance_props['identityManagementType'] = user_type.name

        # Get the instance alias for the instance URL from user input
        instance_alias = None
        while not instance_alias:
            instance_alias = self.choose_instance_alias()
        instance_props['instanceAlias'] = instance_alias
        # Get the directory id if Dir Service was chosen for user management
        if instance_props['identityManagementType'] == "EXISTING_DIRECTORY":
            directory_id = None
            while directory_id == None:
                self.choose_directory_id()
            instance_props['directoryId'] = directory_id

        # Get Outbound call choice
        outbound_calls = None
        while outbound_calls not in [True, False]:
            outbound_calls = self.choose_outbound_calls()
        instance_attributes['outboundCalls'] = outbound_calls

        # Get Inbound call choice
        inbound_calls = None
        while inbound_calls not in [True, False]:
            inbound_calls = self.choose_inbound_calls()
        instance_attributes['inboundCalls'] = inbound_calls

        instance_props['attributes'] = instance_attributes

        return instance_props

    # def set_use_admin():
    # # Todo
    #     use_admin = input("\nWould you like to set an admin for the instance? [N/y]: ")
    #     return use_admin

    # def set_admin_fields():
    #     # Todo
    #     print("\nEnter the following fields for the Administrator: ")
    #     if INSTANCE_CONFIG["IDENTITY_TYPE"]["CHOICE"] == "CONNECT_MANAGED":
    #         confirmed = "n"
    #         ADMIN_FIELDS = INSTANCE_CONFIG["IDENTITY_TYPE"]["ADMIN_FIELDS"]
    #         while confirmed.lower() == "n":
    #             ADMIN_FIELDS["FIRSTNAME"] = input("First Name: ")
    #             ADMIN_FIELDS["LASTNAME"] = input("Last Name: ")
    #             ADMIN_FIELDS["USERNAME"] = input("Username: ")
    #             confirmed = input(f"""You entered:
    #     First name: {ADMIN_FIELDS["FIRSTNAME"]}
    #     Last name: {ADMIN_FIELDS["LASTNAME"]}
    #     Username: {ADMIN_FIELDS["USERNAME"]}
    # Is this correct? [N/y]: """)
    #         password = "a"
    #         vpassword = "b"
    #         while password != vpassword:
    #             password = getpass("Password: ")
    #             vpassword = getpass("Verify password: ")
    #             if password != vpassword:
    #                 print("Passwords do not match")
    #             else:
    #                 ADMIN_FIELDS["PASSWORD"] = password
    #                 ADMIN_FIELDS["PASSWORD_VERIFY"] = vpassword
    #         return