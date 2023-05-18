import * as readline from 'readline';

const IdentityManagementType = {
    CONNECT_MANAGED: 1,
    EXISTING_DIRECTORY: 2,
    SAML: 3,
};

export class Guide {
    #getUserInput(): Promise<string> {
        const r = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        
        return new Promise((resolve) => {
            r.question('> ', (choice) => {
                resolve(choice);
                r.close();
            });            
        });
    }

    async setIdentityManagement() {
        console.log('\nSet identity management');
        const entries = Object.entries(IdentityManagementType);
        for (const [key, value] of entries) {
            console.log(`${value}. ${key}`);
        }
        const choice = await this.#getUserInput();
        return choice;
    }
}
