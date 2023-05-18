import { fromIni } from "@aws-sdk/credential-providers";
import { AwsCredentialIdentityProvider } from "@aws-sdk/types";
import { S3Client } from "@aws-sdk/client-s3";
import { ConnectClient } from "@aws-sdk/client-connect";
import { KinesisClient } from "@aws-sdk/client-kinesis";
import { KMSClient } from "@aws-sdk/client-kms";

export class ClientFactory {
    #regionName: string;
    #credentials: AwsCredentialIdentityProvider;

    get config() {
        return {
            region: this.#regionName, 
            credentials: this.#credentials,
        }
    }

    constructor(profileName: string, regionName: string) {
        this.#regionName = regionName;
        this.#credentials = fromIni({ profile: profileName });
    }
    
    createConnectClient = () => new ConnectClient(this.config);

    createS3Client = () => new S3Client(this.config);

    createKinesisClient = () => new KinesisClient(this.config);

    createKmsClient = () => new KMSClient(this.config)
}