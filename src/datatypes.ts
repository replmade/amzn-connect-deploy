import { CfnInstanceProps } from 'aws-cdk-lib/aws-connect';

export enum IdentityManagementType {
    CONNECT_MANAGED = 1,
    EXISTING_DIRECTORY,
    SAML,
};

export interface AwsConfig {
    profile: string,
    region: string,
};

export interface GuideResponse {
    cfnInstanceProps: CfnInstanceProps,
    awsConfig: AwsConfig,
};

export const validConnectRegions: string[] = [
    'us-east-1',
    'us-west-2',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'eu-central-1',
    'eu-central-2',
    'eu-west-2',
    'eu-south-1',
    'eu-south-2',
    'af-south-1',
    'ap-east-1',
    'ap-south-2',
    'ap-southeast-3',
    'ap-southeast-4',
    'me-south-1',
    'me-central-1',
];