import boto3

class ClientFactory:

    def __init__(self, profile_name, region_name):
        self.profile_name = profile_name
        self.region_name = region_name
        self.session = boto3.Session(
            profile_name=profile_name,
            region_name=region_name)

    def create_client(self, service):
        return self.session.client(service)

    def create_connect_client(self):
        self.connect_client = self.create_client('connect')

    def create_s3_client(self):
        self.s3_client = self.create_client('s3')

    def create_kms_client(self):
        self.kms_client = self.create_client('kms')

    def create_kinesis_client(self):
        self.kinesis_client = self.create_client('kinesis')

    def create_all_clients(self):
        self.create_connect_client()
        self.create_kinesis_client()
        self.create_s3_client()
        self.create_kms_client()


