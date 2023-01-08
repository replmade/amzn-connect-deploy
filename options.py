from optparse import OptionParser

def get_options():
    parser = OptionParser()
    parser.add_option('-p', '--profile', dest='profile_name', default="default",
        help='The AWS credentials profile to use for the install')
    parser.add_option('-r', '--region', dest='region_name', default="us-east-1",
        help='The AWS region to create the Connect instance (overrides profile region)')
    parser.add_option('-c', '--config', dest='config', default=None,
        help='A configuration file that specifies the Connect instance settings')
    return parser.parse_args()
