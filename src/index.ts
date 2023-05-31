#! /usr/bin/env node
import { Guide } from "./guide";
import { Deployer } from "./deployer";

(async function() {
    const { awsConfig, cfnInstanceProps } = await Guide.getCreateOptions();
    const success = await Deployer.runCreate(cfnInstanceProps, awsConfig.profile, awsConfig.region);
    
    if (success) {
        console.log(`Connect instance ${cfnInstanceProps.instanceAlias} successfully deployed`);
        // Run post-deployment configuration
    } else {
        console.log('Connect instance deployment was unsuccessful')
    }
})();