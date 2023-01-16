import { CfnInstance, CfnInstanceProps } from 'aws-cdk-lib/aws-connect';

const getinstancePropsFromArgs = (): CfnInstanceProps => {
    const argv = require('minimist')(process.argv.slice(2));

    const instanceAttrs = <CfnInstance.AttributesProperty>{
        inboundCalls: false,
        outboundCalls: false,
        ...argv,
    };

    const instanceProps = <CfnInstanceProps>{
        identityManagementType: 'CONNECT_MANAGED',
        attributes: instanceAttrs,
        ...argv,
    };

    return instanceProps;
}
module.exports = getinstancePropsFromArgs;