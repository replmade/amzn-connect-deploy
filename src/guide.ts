import * as readline from 'readline';

const IdentityManagementType = {
    CONNECT_MANAGED: 1,
    EXISTING_DIRECTORY: 2,
    SAML: 3,
};

export class Guide {
    #getUserInput(prompt: string): Promise<string> {
        const r = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        
        return new Promise((resolve) => {
            r.question(prompt, (choice) => {
                resolve(choice);
                r.close();
            });            
        });
    }

    async setIdentityManagement(): Promise<string> {
        const choices = ['1', '2', '3'];
        console.log('\nSet identity management');
        const entries = Object.entries(IdentityManagementType);
        for (const [key, value] of entries) {
            console.log(`${value}. ${key}`);
        }
        let choice = await this.#getUserInput('> ');
        while (!choices.includes(choice)) {
            console.log('\nPlease select a number in the range of choices.');
            for (const [key, value] of entries) {
                console.log(`${value}. ${key}`);
            }
            choice = await this.#getUserInput('> ');
        }

        return choice;
    }

    async chooseInstallAlias(): Promise<string> {
        let aliasName: string = '';
        console.log('\nChoose the instance alias for your instance');
        console.log('This will set your instance URL to <instance-alias>.my.connect.aws');
        while (aliasName === '') {
            aliasName = await this.#getUserInput('Enter an instance alias: ');
        }
        return aliasName.toLowerCase();
    }
}
