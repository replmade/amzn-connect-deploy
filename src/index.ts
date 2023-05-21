import { getOptions } from "./options";
import { Guide } from "./guide";
import { Deployer } from "./deployer";

(async function() {
    const { profile, region } = getOptions();
    const cfnInstanceProps = await Guide.getCreateOptions();
    const result = await Deployer.runCreate(cfnInstanceProps, profile, region);
    console.log(result);
})();