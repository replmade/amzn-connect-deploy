"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guide_1 = require("./guide");
(async function () {
    const cfnInstanceProps = await guide_1.Guide.getCreateOptions();
    console.dir(cfnInstanceProps);
})();
