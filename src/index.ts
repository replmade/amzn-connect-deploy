#! /usr/bin/env node
import { getOptions } from "./options";
import { Guide } from "./guide";
import { Deployer } from "./deployer";

(async function() {
    const { profile, region } = getOptions();
    console.log('Profile: ', profile);
    console.log('Region: ', region);
    const cfnInstanceProps = await Guide.getCreateOptions();
    const success = await Deployer.runCreate(cfnInstanceProps, profile, region);
    
    if (success) {
        console.log('Connect instance successfully deployed');
    } else {
        console.log('Connect instance deployment was unsuccessful')
    }
})();