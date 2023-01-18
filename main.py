from options import get_options
from guide import Guide
from deployer import Deployer
from shared.clients import ClientFactory

if __name__ == '__main__':

    # Get the command line options for the script
    (options, args) = get_options()

    # If no config was passed to the script, run the guided setup
    if not options.config:
        guide = Guide()
        instance_props = guide.get_create_options()

    # Initialize Deployer and deploy the instance via the cdk script
    deployer = Deployer()
    success = deployer.run_create(instance_props, options.profile_name)

    if success:
        print('Connect instance successfully deployed')
    else:
        print('Connect instance deployment was unsuccessful')

    