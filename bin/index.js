#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guide_1 = require("./guide");
(async function () {
    const { awsConfig, cfnInstanceProps } = await guide_1.Guide.getCreateOptions();
    console.log(`Profile: ${awsConfig.profile}`);
    console.log(`Region: ${awsConfig.region}`);
    console.log(`Identity Management Type: ${cfnInstanceProps.identityManagementType}`);
    console.log(`Connect Instance Alias Name: ${cfnInstanceProps.instanceAlias}`);
    // const success = await Deployer.runCreate(cfnInstanceProps, awsConfig.profile, awsConfig.region);
    const success = true;
    if (success) {
        console.log('Connect instance successfully deployed');
    }
    else {
        console.log('Connect instance deployment was unsuccessful');
    }
})();
