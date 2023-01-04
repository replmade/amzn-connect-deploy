from optparse import OptionParser
from guide import Guide


if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option('-p', '--profile', dest='profile', default="default",
        help='The AWS credentials profile to use for the install')
    parser.add_option('-r', '--region', dest='region', default="us-east-1",
        help='The AWS region to create the Connect instance (overrides profile region)')
    parser.add_option('-c', '--config', dest='config', default=None,
        help='A configuration file that specifies the Connect instance settings')
    (options, args) = parser.parse_args()

    user_type = None
    instance_alias = None
    use_admin = False
    admin_fields = None

    if not options.config:
        guide = Guide()
        guide.run_create()
