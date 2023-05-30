# AMZN-CONNECT-DEPLOY

* CLI tool for a guided setup of [Amazon Connect](https://aws.amazon.com/connect/).
* Guides user through a list of choices for configuring and deploying Connect.
    - Identity Management (Connect, Directory Services, SAML 2)
    - Instance Alias
    - Connect Admin
    - Telephony (Incoming/Outgoing)
    - Data Storage (Call recordings, transcripts, reports, attachments)
* Uses the AWS CDK (TypeScript) to build a Cloudformation template for reuse

This project will allow the user to create an Amazon Connect instance with any type of configuration simply by choosing options and redeploy any previously configured instance.

## Usage
1. Clone this repository: `gh repo clone replmade/amzn-connect-deploy`
2. Run the guided install: `npm start`
