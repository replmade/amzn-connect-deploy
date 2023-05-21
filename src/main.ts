import { getOptions } from "./options";
import { Guide } from "./guide";

(async function() {
    const cfnInstanceProps = await Guide.getCreateOptions();
    console.dir(cfnInstanceProps);
})();