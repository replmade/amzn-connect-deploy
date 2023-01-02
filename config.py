INSTANCE_CONFIG = {
    "ID_MANAGEMENT": {},
    "ALIAS": "",
    "TELEPHONY": {
        "INCOMING": False,
        "OUTGOING": False
    },
    "DATA": {
        "RECORDINGS": {
            "CUSTOM": False
        },
        "TRANSCRIPTS": {
            "CUSTOM": False
        },
        "REPORTS": {

        },
        "ATTACHMENTS": {
            "CUSTOM": False
        }
    },
    "CLOUDWATCH": {
        "CF_LOGS": False
    }
}

IDENTITY_CONFIGS = [
    {
        "CHOICE": "CONNECT",
        "DISPLAY": "Store users in Amazon Connect",
        "ADMIN": False,
        "ADMIN_FIELDS": {
            "FIRSTNAME": {
                "DISPLAY": "First name: ",
                "VALUE": ""
            },
            "LASTNAME": {
                "DISPLAY": "Last name: ",
                "VALUE": ""
            },
            "USERNAME": {
                "DISPLAY": "Username: ",
                "VALUE": ""
            },
            "PASSWORD": {
                "DISPLAY": "Password: ",
                "VALUE": ""
            },
            "PASSWORD_VERIFY": {
                "DISPLAY": "Password (verify): ",
                "VALUE": ""
            }
        }
    },
    {
        "CHOICE": "DIRECTORY",
        "DISPLAY": "Link to an existing directory",
        "ADMIN": False
    },
    {
        "CHOICE": "SAML",
        "DISPLAY": "SAML 2.0-based authentication",
        "ADMIN": False,
        "ADMIN_FIELDS": {
            "FIRSTNAME": {
                "DISPLAY": "First name: ",
                "VALUE": ""
            },
            "LASTNAME": {
                "DISPLAY": "Last name: ",
                "VALUE": ""
            },
            "USERNAME": {
                "DISPLAY": "Username: ",
                "VALUE": ""
            },            
        }
    }
]