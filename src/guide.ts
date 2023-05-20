import { CfnInstanceProps } from 'aws-cdk-lib/aws-connect';
import { input, confirm } from './shared/util';

export enum IdentityManagementType {
    CONNECT_MANAGED = 1,
    EXISTING_DIRECTORY,
    SAML,
};

export class Guide {
    static async #handleConfirm(option: any) {
        const confirmation = await confirm('Is this correct? ');
        if (confirmation) {
            return option;
        } else {
            return null;
        }
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

    static async chooseInstallAlias(): Promise<string> {
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

    static async getCreateOptions(): Promise<CfnInstanceProps> {
        let identityManagementType: string = '';
        let instanceAlias: string = '';
        let directoryId: string | undefined = undefined;
        let outbound: boolean | null = null;
        let inbound: boolean | null = null;

        while (identityManagementType === '') {
            identityManagementType = await Guide.setIdentityManagement();        
        }
        console.log(identityManagementType);
        while (instanceAlias === null) {
            instanceAlias = await Guide.chooseInstallAlias();
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

        let cfnInstanceProps: CfnInstanceProps = {
            identityManagementType,
            instanceAlias,
            directoryId,
            attributes: {
                inboundCalls: inbound,
                outboundCalls: outbound,
            }
        }

        return cfnInstanceProps;
    }
}
