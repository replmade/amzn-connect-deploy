const allowedParams: string[] = [
    'attributes',
    'identityManagementType',
    'directoryId',
    'instanceAlias',
];

const allowedAttr = [
    'inboundCalls',
    'outboundCalls',
    'autoResolveBestVoices',
    'contactflowLogs',
    'contactLens',
    'earlyMedia',
    'useCustomTtsVoices',
];

type InstanceParams = {
    identityManagementType: string,
    attributes: any,
    instanceAlias?: string,
    directoryId?: string,
};

type AttributeParams = {
    inboundCalls: boolean,
    outboundCalls: boolean,
    autoResolveBestVoices?: boolean,
    contactLens?: boolean,
    contactflowLogs?: boolean,
    earlyMedia?: boolean,
    useCustomTtsVoices?: boolean,
};

const getParamsFromArgs = (): any => {
    let params: any = {};
    let attrs: any = {};
    const argv = require('minimist')(process.argv.slice(2));

    for (let arg in argv) {
        if (allowedParams.indexOf(arg) > -1) {
            params[arg] = argv[arg];
        }

        if (allowedAttr.indexOf(arg) > -1) {
            if (params.attributes === undefined) {
                params['attributes'] = {};
            }

            params.attributes[arg] = argv[arg];
        }
    }

    const instanceParams = params as InstanceParams;
    instanceParams.attributes = attrs as AttributeParams;
    return instanceParams;
}
module.exports = getParamsFromArgs;