"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guide = exports.IdentityManagementType = void 0;
const util_1 = require("./shared/util");
var IdentityManagementType;
(function (IdentityManagementType) {
    IdentityManagementType[IdentityManagementType["CONNECT_MANAGED"] = 1] = "CONNECT_MANAGED";
    IdentityManagementType[IdentityManagementType["EXISTING_DIRECTORY"] = 2] = "EXISTING_DIRECTORY";
    IdentityManagementType[IdentityManagementType["SAML"] = 3] = "SAML";
})(IdentityManagementType = exports.IdentityManagementType || (exports.IdentityManagementType = {}));
;
;
;
const validConnectRegions = [
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
class Guide {
    static async #handleConfirm(option) {
        const confirmation = await (0, util_1.confirm)('Is this correct? ');
        if (confirmation) {
            return option;
        }
        else {
            return null;
        }
    }
    static async setProfile() {
        let profile = 'default';
        profile = await (0, util_1.input)('Set AWS profile [Default]: ');
        return this.#handleConfirm(profile);
    }
    static async setRegion() {
        let region = 'us-east-1';
        region = await (0, util_1.input)('Set deployment region [us-east-1]: ');
        while (!validConnectRegions.includes(region)) {
            console.log(`Connect cannot be deployed to region ${region}`);
            region = await (0, util_1.input)('Set deployment region [us-east-1]: ');
        }
        return this.#handleConfirm(region);
    }
    static async setIdentityManagement() {
        console.log('\nSet identity management');
        const entries = Object.entries(IdentityManagementType);
        for (const [key, value] of entries) {
            if (!isNaN(Number(key))) {
                console.log(`${key}. ${value}`);
            }
        }
        let choice = await (0, util_1.input)('> ');
        while (!IdentityManagementType[Number(choice)]) {
            console.log('\nPlease select a number in the range of choices.');
            for (const [key, value] of entries) {
                if (!isNaN(Number(key))) {
                    console.log(`${key}. ${value}`);
                }
            }
            choice = await (0, util_1.input)('> ');
        }
        console.log(`You chose ${IdentityManagementType[Number(choice)]}`);
        return this.#handleConfirm(IdentityManagementType[Number(choice)]);
    }
    static async chooseInstanceAlias() {
        let aliasName = '';
        console.log('\nChoose the instance alias for your instance');
        console.log('This will set your instance URL to <instance-alias>.my.connect.aws');
        while (aliasName === '') {
            aliasName = await (0, util_1.input)('Enter an instance alias: ');
        }
        console.log(`You chose ${aliasName}`);
        return this.#handleConfirm(aliasName.toLowerCase());
    }
    static async allowCalls(promptMessage) {
        let response = null;
        while (typeof response !== 'boolean') {
            response = await (0, util_1.confirm)(promptMessage);
        }
        console.log(`You entered ${response ? 'yes' : 'no'}.`);
        return this.#handleConfirm(response);
    }
    static async chooseDirectoryId() {
        let id = '';
        console.log('Enter the AWS Directory Service directory id to manage your users: ');
        while (id === '') {
            id = await (0, util_1.input)('> ');
        }
        console.log(`You chose ${id}`);
        return this.#handleConfirm(id);
    }
    static async getCreateOptions() {
        let awsProfile = '';
        let awsRegion = '';
        let identityManagementType = '';
        let instanceAlias = '';
        let directoryId = undefined;
        let outbound = null;
        let inbound = null;
        awsProfile = await Guide.setProfile();
        awsRegion = await Guide.setRegion();
        while (identityManagementType === '') {
            identityManagementType = await Guide.setIdentityManagement();
        }
        console.log(identityManagementType);
        while (instanceAlias === '') {
            instanceAlias = await Guide.chooseInstanceAlias();
        }
        if (identityManagementType === 'EXISTING_DIRECTORY') {
            while (directoryId === null) {
                directoryId = await Guide.chooseDirectoryId();
            }
        }
        while (outbound === null) {
            outbound = await Guide.allowCalls('Allow outbound calls? ');
        }
        while (inbound === null) {
            inbound = await Guide.allowCalls('Allow inbound calls? ');
        }
        const awsConfig = {
            profile: awsProfile,
            region: awsRegion,
        };
        const cfnInstanceProps = {
            identityManagementType,
            instanceAlias,
            directoryId,
            attributes: {
                inboundCalls: inbound,
                outboundCalls: outbound,
            }
        };
        return { awsConfig, cfnInstanceProps };
    }
}
exports.Guide = Guide;
