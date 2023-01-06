from optparse import OptionParser
from guide import Guide
from deployer import Deployer
from shared.clients import ClientFactory

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option('-p', '--profile', dest='profile_name', default="default",
        help='The AWS credentials profile to use for the install')
    parser.add_option('-r', '--region', dest='region_name', default="us-east-1",
        help='The AWS region to create the Connect instance (overrides profile region)')
    parser.add_option('-c', '--config', dest='config', default=None,
        help='A configuration file that specifies the Connect instance settings')
    (options, args) = parser.parse_args()

    user_type = None
    instance_alias = None
    use_admin = False
    admin_fields = None

    # Create boto3 clients
    client_factory = ClientFactory(options.profile_name, options.region_name)
    client_factory.create_all_clients()

    if not options.config:
        guide = Guide()
        instance_config = guide.get_create_options()

    deployer = Deployer()
    deployer.run_create(client_factory.connect_client, instance_config)

