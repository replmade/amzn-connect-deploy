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

    // Create an Amazon Connect instance
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_connect.CfnInstance.html
    /*
      Required command line arguments:
        --identityManagementType= CONNECT_MANAGED | EXISTING_DIRECTORY | SAML
        --inboundCalls= false | true
        --outboundCalls= false | true
      Optional command line arguments:
        --directoryId= <string> if identityManagementType==EXISTING_DIRECTORY
        --instanceAlias= <string>
        --autoResolveBestVoices= false | true
        --contactLens= false | true
        --contactflowLogs= false | true
        --earlyMedia= false | true
        --useCustomTtsVoices= false | true
    */
    const customName = instanceProps.instanceAlias || 'customCC';
    const connectInstance = new aws_connect.CfnInstance(this, customName + 'Connect', instanceProps);
  }
}