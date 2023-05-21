"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
const guide_1 = require("./guide");
(async function () {
    const options = (0, options_1.getOptions)();
    console.dir(options);
    const cfnInstanceProps = await guide_1.Guide.getCreateOptions();
    console.dir(cfnInstanceProps);
})();
