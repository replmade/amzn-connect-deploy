from enum import Enum

class IdType(Enum):
    CONNECT = "CONNECT_MANAGED"
    DIRECTORY = "EXISTING_DIRECTORY"
    SAML = "SAML"

