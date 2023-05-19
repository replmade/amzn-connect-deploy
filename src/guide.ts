import { input, confirm } from './shared/util';

export enum IdentityManagementType {
    CONNECT_MANAGED = 1,
    EXISTING_DIRECTORY,
    SAML,
};

export class Guide {
    async setIdentityManagement(): Promise<string | null> {
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
        const confirmation = await confirm('Is this correct? ');
        if (confirmation) {
            return choice;
        } else {
            return null;
        }
    }

    async chooseInstallAlias(): Promise<string | null> {
        let aliasName: string = '';
        console.log('\nChoose the instance alias for your instance');
        console.log('This will set your instance URL to <instance-alias>.my.connect.aws');
        while (aliasName === '') {
            aliasName = await input('Enter an instance alias: ');
        }
        console.log(`You chose ${aliasName}`);
        const confirmation = await confirm('Is this correct? ');
        if (confirmation) {
            return aliasName.toLowerCase();
        } else {
            return null;
        }
    }

    async chooseDirectoryId(): Promise<string> {
        let id = '';
        console.log('Enter the AWS Directory Service directory id to manage your users: ');
        while (id === '') {
            id = await input('> ');
        }
        return id;
    }

    // async chooseOutboundCalls(): Promise<boolean> {
    //     let outbound = false;

    // }
}
