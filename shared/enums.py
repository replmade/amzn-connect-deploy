from enum import Enum

class CfnEnum(Enum):
    @classmethod
    def has_value(self, value):
        return value in self._value2member_map_

    @classmethod
    def has_name(self, name):
        return name in self._member_names_

    @classmethod
    def list(self):
        return list(map(lambda e: e.value, self))

class CfnInstanceProps(CfnEnum):
    identityManagementType = 'identityManagementType'
    directoryId = 'directoryId'
    instanceAlias = 'instanceAlias'
    attributes = 'attributes'

class CfnInstanceAttributes(CfnEnum):
    inboundCalls = 'inboundCalls'
    outboundCalls = 'outboundCalls'
    autoResolveBestVoices = 'autoResolveBestVoices'
    contactFlowLogs = 'contactFlowLogs'
    contactLens = 'contactLens'
    earlyMedia = 'earlyMedia'
    useCustomTtsVoices = 'useCustomTtsVoices'

class IdentityManagementType(CfnEnum):
    CONNECT_MANAGED = '1'
    EXISTING_DIRECTORY = '2'
    SAML = '3'