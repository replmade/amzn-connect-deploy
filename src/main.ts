import { getOptions } from "./options";
import { Guide } from "./guide";

(async function() {
    let identityType: string | null = null;
    let alias: string | null = null;

    const options = getOptions();
    console.dir(options);
    const guide = new Guide();
    while (identityType === null) {
        identityType = await guide.setIdentityManagement();        
    }
    while (alias === null) {
        alias = await guide.chooseInstallAlias();
    }
})();