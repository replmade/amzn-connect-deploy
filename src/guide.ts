import { CfnInstanceProps } from 'aws-cdk-lib/aws-connect';
import { input, confirm, emptyNullUndefined } from './shared/util';
import {
    IdentityManagementType,
    AwsConfig,
    GuideResponse,
    validConnectRegions,
} from './datatypes';

export class Guide {
    static async #handleConfirm(option: any) {
        const confirmation = await confirm(`Is [${option}] correct? `);
        if (confirmation === true) {
            return option;
        } else {
            return null;
        }
    }

    static async setProfile(): Promise<string> {
        let profile;
        profile = await input('Set AWS profile [default]: ');
        if (profile === '') {
            profile = 'default';
        }
        return this.#handleConfirm(profile);
    }

    static async setRegion(): Promise<string> {
        let region = 'us-east-1';
        region = await input('Set deployment region [us-east-1]: ');
        while (!validConnectRegions.includes(region)) {
            if (region === '') {
                console.log('No region was entered.');
            } else {
                console.log(`Connect cannot be deployed to region '${region}'`);
            }
            region = await input('Set deployment region [us-east-1]: ');
        }
        return this.#handleConfirm(region);
    }

    static async setIdentityManagement(): Promise<string> {
        console.log('\nSet identity management');
        const entries = Object.entries(IdentityManagementType);
        for (const [key, value] of entries) {
            if (!isNaN(Number(key))) {
                console.log(`${key}. ${value}`);
            }
        }
        let choice = await input('> ');
        while (!IdentityManagementType[Number(choice)]) {
            console.log('\nPlease select a number in the range of choices.');
            for (const [key, value] of entries) {
                if (!isNaN(Number(key))) {
                    console.log(`${key}. ${value}`);
                }
            }
            choice = await input('> ');
        }
        console.log(`You chose ${IdentityManagementType[Number(choice)]}`);
        return this.#handleConfirm(IdentityManagementType[Number(choice)]);
    }

    static async chooseInstanceAlias(): Promise<string> {
        let aliasName: string = '';
        console.log('\nChoose the instance alias for your instance');
        console.log('This will set your instance URL to <instance-alias>.my.connect.aws');
        while (aliasName === '') {
            aliasName = await input('Enter an instance alias: ');
        }
        console.log(`You chose ${aliasName}`);
        return this.#handleConfirm(aliasName.toLowerCase());
    }

    static async selectBooleanOption(promptMessage: string): Promise<boolean | null> {
        let response = null;
        while (typeof response !== 'boolean') {
            response = await confirm(promptMessage);
        }
        console.log(`You entered ${response ? 'yes' : 'no'}.`);
        return this.#handleConfirm(response);        
    }

    static async chooseDirectoryId(): Promise<string | undefined> {
        let id = '';
        console.log('Enter the AWS Directory Service directory id to manage your users: ');
        while (id === '') {
            id = await input('> ');
        }
        console.log(`You chose ${id}`);
        return this.#handleConfirm(id);
    }

    static async getCreateOptions(): Promise<GuideResponse> {
        let awsProfile: string = '';
        let awsRegion: string = '';
        let identityManagementType: string = '';
        let instanceAlias: string = '';
        let directoryId: string | undefined = undefined;
        let outboundCalls: boolean | null = null;
        let inboundCalls: boolean | null = null;
        let contactLens: boolean | null = null;
        let contactflowLogs: boolean | null = null;
        let autoResolveBestVoices: boolean | null = null;

        while (emptyNullUndefined(awsProfile)) {
            awsProfile = await Guide.setProfile();   
        }

        while (emptyNullUndefined(awsRegion)) {
            awsRegion = await Guide.setRegion();
        }

        while (emptyNullUndefined(identityManagementType)) {
            identityManagementType = await Guide.setIdentityManagement();        
        }

        while (emptyNullUndefined(instanceAlias)) {
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

        const awsConfig: AwsConfig = {
            profile: awsProfile,
            region: awsRegion,
        };

        const cfnInstanceProps: CfnInstanceProps = {
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
        }

        return { awsConfig, cfnInstanceProps };
    }

    static async getConfigureOptions() {
        console.log('Configure post-install options');
    }
}