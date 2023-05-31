"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validConnectRegions = exports.IdentityManagementType = void 0;
var IdentityManagementType;
(function (IdentityManagementType) {
    IdentityManagementType[IdentityManagementType["CONNECT_MANAGED"] = 1] = "CONNECT_MANAGED";
    IdentityManagementType[IdentityManagementType["EXISTING_DIRECTORY"] = 2] = "EXISTING_DIRECTORY";
    IdentityManagementType[IdentityManagementType["SAML"] = 3] = "SAML";
})(IdentityManagementType = exports.IdentityManagementType || (exports.IdentityManagementType = {}));
;
;
;
exports.validConnectRegions = [
    'us-east-1',
    'us-west-2',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'eu-central-1',
    'eu-central-2',
    'eu-west-2',
    'eu-south-1',
    'eu-south-2',
    'af-south-1',
    'ap-east-1',
    'ap-south-2',
    'ap-southeast-3',
    'ap-southeast-4',
    'me-south-1',
    'me-central-1',
];
