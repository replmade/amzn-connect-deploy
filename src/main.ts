import { getOptions } from "./options";
import { Guide } from "./guide";

(function() {
    const options = getOptions();
    console.dir(options);
    const guide = new Guide();
    guide.setIdentityManagement();
})();