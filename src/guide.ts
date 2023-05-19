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

    static async setIdentityManagement(): Promise<string | null> {
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
        return this.#handleConfirm(choice);
    }

    static async chooseInstallAlias(): Promise<string | null> {
        let aliasName: string = '';
        console.log('\nChoose the instance alias for your instance');
        console.log('This will set your instance URL to <instance-alias>.my.connect.aws');
        while (aliasName === '') {
            aliasName = await input('Enter an instance alias: ');
        }
        console.log(`You chose ${aliasName}`);
        return this.#handleConfirm(aliasName.toLowerCase());
    }

    static async chooseDirectoryId(): Promise<string | null> {
        let id = '';
        console.log('Enter the AWS Directory Service directory id to manage your users: ');
        while (id === '') {
            id = await input('> ');
        }
        console.log(`You chose ${id}`);
        return this.#handleConfirm(id);
    }

    static async chooseOutboundCalls(): Promise<boolean | null> {
        let outbound = null;
        while (typeof outbound !== 'boolean') {
            outbound = await confirm('Enable outbound calls?');
        }
        console.log(`You entered ${outbound ? 'yes' : 'no'}.`);
        return this.#handleConfirm(outbound);
    }

    static async chooseInboundCalls(): Promise<boolean | null> {
        let inbound = null;
        while (typeof inbound !== 'boolean') {
            inbound = await confirm('Enable inbound calls?');
        }
        console.log(`You entered ${inbound ? 'yes' : 'no'}.`);
        return this.#handleConfirm(inbound);
    }

    static async getCreateOptions(): Promise<void> {
        let identityType: string | null = null;
        let alias: string | null = null;
        let dirId: string | null = null;
        let outbound: boolean | null = null;
        let inbound: boolean | null = null;

        while (identityType === null) {
            identityType = await Guide.setIdentityManagement();        
        }
        console.log(identityType);
        while (alias === null) {
            alias = await Guide.chooseInstallAlias();
        }
        if (identityType === 'EXISTING_DIRECTORY') {
            while (dirId === null) {
                dirId = await Guide.chooseDirectoryId();
            }
        }
        while (outbound === null) {
            outbound = await Guide.chooseOutboundCalls();
        }
        while (inbound === null) {
            inbound = await Guide.chooseInboundCalls();
        }
    }
}
