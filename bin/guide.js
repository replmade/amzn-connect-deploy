"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guide = void 0;
const util_1 = require("./shared/util");
const datatypes_1 = require("./datatypes");
class Guide {
    static async #handleConfirm(option) {
        const confirmation = await (0, util_1.confirm)(`Is [${option}] correct? `);
        if (confirmation === true) {
            return option;
        }
        else {
            return null;
        }
    }
    static async setProfile() {
        let profile;
        profile = await (0, util_1.input)('Set AWS profile [default]: ');
        if (profile === '') {
            profile = 'default';
        }
        return this.#handleConfirm(profile);
    }
    static async setRegion() {
        let region = 'us-east-1';
        region = await (0, util_1.input)('Set deployment region [us-east-1]: ');
        while (!datatypes_1.validConnectRegions.includes(region)) {
            if (region === '') {
                console.log('No region was entered.');
            }
            else {
                console.log(`Connect cannot be deployed to region '${region}'`);
            }
            region = await (0, util_1.input)('Set deployment region [us-east-1]: ');
        }
        return this.#handleConfirm(region);
    }
    static async setIdentityManagement() {
        console.log('\nSet identity management');
        const entries = Object.entries(datatypes_1.IdentityManagementType);
        for (const [key, value] of entries) {
            if (!isNaN(Number(key))) {
                console.log(`${key}. ${value}`);
            }
        }
        let choice = await (0, util_1.input)('> ');
        while (!datatypes_1.IdentityManagementType[Number(choice)]) {
            console.log('\nPlease select a number in the range of choices.');
            for (const [key, value] of entries) {
                if (!isNaN(Number(key))) {
                    console.log(`${key}. ${value}`);
                }
            }
            choice = await (0, util_1.input)('> ');
        }
        console.log(`You chose ${datatypes_1.IdentityManagementType[Number(choice)]}`);
        return this.#handleConfirm(datatypes_1.IdentityManagementType[Number(choice)]);
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
    static async selectBooleanOption(promptMessage) {
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
        let outboundCalls = null;
        let inboundCalls = null;
        let contactLens = null;
        let contactflowLogs = null;
        let autoResolveBestVoices = null;
        while ((0, util_1.emptyNullUndefined)(awsProfile)) {
            awsProfile = await Guide.setProfile();
        }
        while ((0, util_1.emptyNullUndefined)(awsRegion)) {
            awsRegion = await Guide.setRegion();
        }
        while ((0, util_1.emptyNullUndefined)(identityManagementType)) {
            identityManagementType = await Guide.setIdentityManagement();
        }
        while ((0, util_1.emptyNullUndefined)(instanceAlias)) {
            instanceAlias = await Guide.chooseInstanceAlias();
        }
        if (identityManagementType === 'EXISTING_DIRECTORY') {
            while (directoryId === null) {
                directoryId = await Guide.chooseDirectoryId();
            }
        }
        while (outboundCalls === null) {
            outboundCalls = await Guide.selectBooleanOption('Allow outbound calls? ');
        }
        while (inboundCalls === null) {
            inboundCalls = await Guide.selectBooleanOption('Allow inbound calls? ');
        }
        while (contactLens === null) {
            contactLens = await Guide.selectBooleanOption('Enable Contact Lens? ');
        }
        while (contactflowLogs === null) {
            contactflowLogs = await Guide.selectBooleanOption('Enable contact flow logs? ');
        }
        while (autoResolveBestVoices === null) {
            autoResolveBestVoices = await Guide.selectBooleanOption('Use the best available voice from Amazon Polly? ');
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
                inboundCalls,
                outboundCalls,
                contactLens,
                contactflowLogs,
                autoResolveBestVoices,
            }
        };
        return { awsConfig, cfnInstanceProps };
    }
}
exports.Guide = Guide;
