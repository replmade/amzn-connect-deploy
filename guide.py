from getpass import getpass
from shared.util import Util
from config import InstanceConfig
from config import IdType

class Guide:

    def choose_user_type(self):
        print('\nSet identity management')
        for id_type in IdType:
            print(f"{id_type['Ordinal']}. {id_type['IdentityManagementType']}")
        choice_input = input("Choice (number): ")
        if Util.empty_or_none(choice_input):
            return None
        if choice_input[0].lower() == "q":
            Util.quit_setup()
        if choice_input not in [id_type['Ordinal'] for id_type in IdType]:
            print('\nPlease select a number in the range of choices.\n')
            return None
        choice = [id_type for id_type in IdType if id_type['Ordinal'] == choice_input][0]
        print(f"You chose {choice['Ordinal']}")
        confirm = Util.confirm_choice("Is this correct?")
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
        user_type = None
        instance_alias = None
        directory_id = None
        outbound_calls = None
        inbound_calls = None

        instance_config = InstanceConfig()
        # Get the IdentityManagementType for the instance from user input
        while not user_type:
            user_type = self.choose_user_type()
        instance_config.set_user_type(user_type)

        # Get the instance alias for the instance URL from user input
        while not instance_alias:
            instance_alias = self.choose_instance_alias()
        instance_config.set_instance_alias(instance_alias)

        # Get the directory id if Dir Service was chosen for user management
        if user_type["IdentityManagementType"] == "EXISTING_DIRECTORY":
            while directory_id == None:
                self.choose_directory_id()
            instance_config.set_directory_id(directory_id)

        # Get Outbound call choice
        while outbound_calls not in [True, False]:
            outbound_calls = self.choose_outbound_calls()
        instance_config.set_outbound_call_enabled(outbound_calls)

        # Get Inbound call choice
        while inbound_calls not in [True, False]:
            inbound_calls = self.choose_inbound_calls()
        instance_config.set_inbound_calls_enabled(inbound_calls)

        return instance_config

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