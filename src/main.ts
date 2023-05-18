import { getOptions } from "./options";
import { Guide } from "./guide";

(async function() {
    const options = getOptions();
    console.dir(options);
    const guide = new Guide();
    await guide.setIdentityManagement();
    await guide.chooseInstallAlias();
})();