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
        confirm = Util.confirm_choice(f"You chose {alias_name.lower()}.my.connect.aws. Is this correct?")
        if confirm:
            return alias_name.lower()
        return None

    def run_create(self):
        user_type = None
        instance_alias = None

        iconfig = InstanceConfig()
        # Get the IdentityManagementType for the instance from user input
        while not user_type:
            user_type = self.choose_user_type()
        iconfig.set_user_type(user_type)

        # Get the instance alias for the instance URL from user input
        while not instance_alias:
            instance_alias = self.choose_instance_alias()
        iconfig.set_instance_alias(instance_alias)

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