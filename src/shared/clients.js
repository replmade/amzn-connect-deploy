"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ClientFactory_regionName, _ClientFactory_credentials;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFactory = void 0;
const credential_providers_1 = require("@aws-sdk/credential-providers");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_connect_1 = require("@aws-sdk/client-connect");
const client_kinesis_1 = require("@aws-sdk/client-kinesis");
const client_kms_1 = require("@aws-sdk/client-kms");
class ClientFactory {
    get config() {
        return {
            region: __classPrivateFieldGet(this, _ClientFactory_regionName, "f"),
            credentials: __classPrivateFieldGet(this, _ClientFactory_credentials, "f"),
        };
    }
    constructor(profileName, regionName) {
        _ClientFactory_regionName.set(this, void 0);
        _ClientFactory_credentials.set(this, void 0);
        this.createConnectClient = () => new client_connect_1.ConnectClient(this.config);
        this.createS3Client = () => new client_s3_1.S3Client(this.config);
        this.createKinesisClient = () => new client_kinesis_1.KinesisClient(this.config);
        this.createKmsClient = () => new client_kms_1.KMSClient(this.config);
        __classPrivateFieldSet(this, _ClientFactory_regionName, regionName, "f");
        __classPrivateFieldSet(this, _ClientFactory_credentials, (0, credential_providers_1.fromIni)({ profile: profileName }), "f");
    }
}
exports.ClientFactory = ClientFactory;
_ClientFactory_regionName = new WeakMap(), _ClientFactory_credentials = new WeakMap();
