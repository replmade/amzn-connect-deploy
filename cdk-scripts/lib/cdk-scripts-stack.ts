import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_connect } from 'aws-cdk-lib';  
import { getinstancePropsFromParams } from './parse-options';
import * as props from './instance-props.json';


const instanceProps = getinstancePropsFromParams(props);

export class ConnectInstanceStack extends Stack {
  constructor(
    scope: Construct, 
    id: string, 
    props?: StackProps, 
  ) {
    super(scope, id, props);

    const customName = instanceProps.instanceAlias || 'AmazonConnectContactCenter';
    const connectInstance = new aws_connect.CfnInstance(this, customName, instanceProps);
  }
}