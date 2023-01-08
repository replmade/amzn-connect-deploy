from options import get_options
from guide import Guide
from deployer import Deployer
from shared.clients import ClientFactory

if __name__ == '__main__':

    # Get the command line options for the script
    (options, args) = get_options()

    # Create boto3 clients
    client_factory = ClientFactory(options.profile_name, options.region_name)
    client_factory.create_all_clients()

    # If no config was passed to the script, run the guided setup
    if not options.config:
        guide = Guide()
        instance_config = guide.get_create_options()

    # Initialize Deployer and deploy the instance
    deployer = Deployer()
    deployer.run_create(client_factory.connect_client, instance_config)

