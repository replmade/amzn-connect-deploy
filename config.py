from shared.util import Util

class InstanceConfig:

    def __init__(self, **config_dict):
        if not Util.is_dict_empty(config_dict):
            for k, v in config_dict.items():
                setattr(self, k, v)

    def set_user_type(self, choice):
        self.IdentityManagementType = choice["IdentityManagementType"]

    def set_instance_alias(self, alias_name):
        self.InstanceAlias = alias_name

    def set_directory_id(self, directory_id):
        self.DirectoryId = directory_id

    def set_inbound_calls_enabled(self, enable):
        self.InboundCallsEnabled = enable

    def set_outbound_call_enabled(self, enable):
        self.OutboundCallsEnabled = enable

# INSTANCE_CONFIG = {
#     "IDENTITY_TYPE": None,
#     "InstanceAlias": "",
#     "TELEPHONY": {
#         "INCOMING": False,
#         "OUTGOING": False
#     },
#     "DATA": {
#         "RECORDINGS": {
#             "CUSTOM": False
#         },
#         "TRANSCRIPTS": {
#             "CUSTOM": False
#         },
#         "REPORTS": {

#         },
#         "ATTACHMENTS": {
#             "CUSTOM": False
#         }
#     },
#     "CLOUDWATCH": {
#         "CF_LOGS": False
#     }
# }

# IDENTITY_CONFIGS = (
#     {
#         "Ordinal": "1",
#         "CHOICE": "CONNECT_MANAGED",
#         "DISPLAY": "Store users in Amazon Connect",
#         "ADMIN": False,
#         "ADMIN_FIELDS": {
#             "FIRSTNAME": {
#                 "DISPLAY": "First name: ",
#                 "VALUE": ""
#             },
#             "LASTNAME": {
#                 "DISPLAY": "Last name: ",
#                 "VALUE": ""
#             },
#             "USERNAME": {
#                 "DISPLAY": "Username: ",
#                 "VALUE": ""
#             },
#             "PASSWORD": {
#                 "DISPLAY": "Password: ",
#                 "VALUE": ""
#             },
#             "PASSWORD_VERIFY": {
#                 "DISPLAY": "Password (verify): ",
#                 "VALUE": ""
#             }
#         }
#     },
#     {
#         "Ordinal": "2",
#         "CHOICE": "EXISTING_DIRECTORY",
#         "DISPLAY": "Link to an existing directory",
#         "ADMIN": False
#     },
#     {
#         "Ordinal": "3",
#         "CHOICE": "SAML",
#         "DISPLAY": "SAML 2.0-based authentication",
#         "ADMIN": False,
#         "ADMIN_FIELDS": {
#             "FIRSTNAME": {
#                 "DISPLAY": "First name: ",
#                 "VALUE": ""
#             },
#             "LASTNAME": {
#                 "DISPLAY": "Last name: ",
#                 "VALUE": ""
#             },
#             "USERNAME": {
#                 "DISPLAY": "Username: ",
#                 "VALUE": ""
#             },            
#         }
#     }
# )