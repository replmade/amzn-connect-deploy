import * as readline from 'readline';
// class Util:
//     @staticmethod
//     def read_json_file(file_path):
//         with open(file_path, 'r') as f:
//             return json.load(f)

//     @staticmethod
//     def write_json_file(dict_data, file_path):
//         with open(file_path, 'w') as f:
//             json.dump(dict_data, f)

//     @staticmethod
//     def is_dict_empty(d):
//         return bool(d)

//     @staticmethod
//     def empty_or_none(t):
//         if t == "" or t == None:
//             return True
//         return False

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
    const response = await input(`${optionText} [N/y]: `);
    if (response[0].toLowerCase() === 'y') {
        return true;
    }
    return false;
};

export const confirm = async (confirmText: string): Promise<boolean> => {
    const response = await input(`${confirmText} [N/y]: `);
    if (response[0]?.toLowerCase() === 'q') {
        quitSetup();
    }
    if (response[0]?.toLowerCase() === 'y') {
        return true;
    }
    return false;
};

const quitSetup = () => {
    console.log('\nExiting setup...');
    process.exit();
};
