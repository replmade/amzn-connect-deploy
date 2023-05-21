"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const guide_1 = require("./guide");
const deployer_1 = require("./deployer");
(async function () {
    const { profile, region } = (0, options_1.getOptions)();
    const cfnInstanceProps = await guide_1.Guide.getCreateOptions();
    const result = await deployer_1.Deployer.runCreate(cfnInstanceProps, profile, region);
    console.log(result);
})();
