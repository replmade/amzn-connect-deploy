import { CfnInstance, CfnInstanceProps } from 'aws-cdk-lib/aws-connect';

export function getinstancePropsFromParams(props: any): CfnInstanceProps {
    const instanceAttrs = <CfnInstance.AttributesProperty>{
        inboundCalls: false,
        outboundCalls: false,
        ...props,
    };

    const instanceProps = <CfnInstanceProps>{
        identityManagementType: 'CONNECT_MANAGED',
        attributes: instanceAttrs,
        ...props,
    };

    return instanceProps;
}