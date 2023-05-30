import { CfnInstanceProps } from 'aws-cdk-lib/aws-connect';
import { input, confirm } from './shared/util';

export enum IdentityManagementType {
    CONNECT_MANAGED = 1,
    EXISTING_DIRECTORY,
    SAML,
};

interface AwsConfig {
    profile: string,
    region: string,
};

export interface GuideResponse {
    cfnInstanceProps: CfnInstanceProps,
    awsConfig: AwsConfig,
};

const validConnectRegions: string[] = [
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

export class Guide {
    static async #handleConfirm(option: any) {
        const confirmation = await confirm('Is this correct? ');
        if (confirmation) {
            return option;
        } else {
            return null;
        }
    }

    static async setProfile(): Promise<string> {
        let profile = 'default';
        profile = await input('Set AWS profile [Default]: ');
        return this.#handleConfirm(profile);
    }

    static async setRegion(): Promise<string> {
        let region = 'us-east-1';
        region = await input('Set deployment region [us-east-1]: ');
        while (!validConnectRegions.includes(region)) {
            console.log(`Connect cannot be deployed to region ${region}`);
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

    static async allowCalls(promptMessage: string): Promise<boolean | null> {
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
        let outbound: boolean | null = null;
        let inbound: boolean | null = null;

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

        const awsConfig: AwsConfig = {
            profile: awsProfile,
            region: awsRegion,
        };

        const cfnInstanceProps: CfnInstanceProps = {
            identityManagementType,
            instanceAlias,
            directoryId,
            attributes: {
                inboundCalls: inbound,
                outboundCalls: outbound,
            }
        }

        return { awsConfig, cfnInstanceProps };
    }
}