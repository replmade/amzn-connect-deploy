"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFactory = void 0;
const credential_providers_1 = require("@aws-sdk/credential-providers");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_connect_1 = require("@aws-sdk/client-connect");
const client_kinesis_1 = require("@aws-sdk/client-kinesis");
const client_kms_1 = require("@aws-sdk/client-kms");
class ClientFactory {
    #regionName;
    #credentials;
    get config() {
        return {
            region: this.#regionName,
            credentials: this.#credentials,
        };
    }
    constructor(profileName, regionName) {
        this.#regionName = regionName;
        this.#credentials = (0, credential_providers_1.fromIni)({ profile: profileName });
    }
    createConnectClient = () => new client_connect_1.ConnectClient(this.config);
    createS3Client = () => new client_s3_1.S3Client(this.config);
    createKinesisClient = () => new client_kinesis_1.KinesisClient(this.config);
    createKmsClient = () => new client_kms_1.KMSClient(this.config);
}
exports.ClientFactory = ClientFactory;
