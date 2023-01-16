import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';    // core constructs
import { aws_connect } from 'aws-cdk-lib';               // stable module

export class OpenAICCConnectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create an Amazon Connect instance
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_connect.CfnInstance.html
    const openAICCConnect = new aws_connect.CfnInstance(this, 'OpenAICCConnect', {
      instanceAlias: 'openaicc',
      identityManagementType: 'CONNECT_MANAGED',
      attributes: {
        inboundCalls: true,
        outboundCalls: true,
        contactflowLogs: true, 
      }
    });
  }
}