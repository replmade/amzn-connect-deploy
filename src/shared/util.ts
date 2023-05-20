import { readFileSync, writeFileSync } from 'fs';
import * as readline from 'readline';

export const readJson = async (filepath: string): Promise<string> => {
    return readFileSync(filepath, { encoding: 'utf8' });
}

export const writeJson = async (data: any, filepath: string): Promise<void> => {
    writeFileSync(filepath, JSON.stringify(data));
}

export const input = (prompt: string): Promise<string> => {
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
};

export const checkYes = async (optionText: string) => {
    const response = await input(`${optionText} [Y/n]: `);
    if (response === '' || response[0]?.toLowerCase() === 'y') {
        return true;
    }
    return false;
};

export const confirm = async (confirmText: string): Promise<boolean> => {
    const response = await input(`${confirmText} [Y/n]: `);
    if (response[0]?.toLowerCase() === 'q') {
        quitSetup();
    }
    if (response === '' || response[0]?.toLowerCase() === 'y') {
        return true;
    }
    return false;
};

const quitSetup = () => {
    console.log('\nExiting setup...');
    process.exit();
};
