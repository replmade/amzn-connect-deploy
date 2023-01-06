from pprint import pprint


class Deployer:

    def run_create(self, client, config):
        resp = client.create_instance(**vars(config))
        # handle response
        pprint(resp)
