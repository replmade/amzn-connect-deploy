#! /usr/bin/env node
import { Guide } from "./guide";
import { Deployer } from "./deployer";

(async function() {
    const { awsConfig, cfnInstanceProps } = await Guide.getCreateOptions();
    console.log(`Profile: ${awsConfig.profile}`);
    console.log(`Region: ${awsConfig.region}`);
    console.log(`Identity Management Type: ${cfnInstanceProps.identityManagementType}`);
    console.log(`Connect Instance Alias Name: ${cfnInstanceProps.instanceAlias}`);
    const success = await Deployer.runCreate(cfnInstanceProps, awsConfig.profile, awsConfig.region);
    
    if (success) {
        console.log('Connect instance successfully deployed');
    } else {
        console.log('Connect instance deployment was unsuccessful')
    }
})();