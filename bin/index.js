"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const guide_1 = require("./guide");
const deployer_1 = require("./deployer");
(async function () {
    const { profile, region } = (0, options_1.getOptions)();
    console.log('Profile: ', profile);
    console.log('Region: ', region);
    const cfnInstanceProps = await guide_1.Guide.getCreateOptions();
    const success = await deployer_1.Deployer.runCreate(cfnInstanceProps, profile, region);
    if (success) {
        console.log('Connect instance successfully deployed');
    }
    else {
        console.log('Connect instance deployment was unsuccessful');
    }
})();
