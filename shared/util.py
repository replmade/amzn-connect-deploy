import json

class Util:
    @staticmethod
    def read_json_file(file_path):
        with open(file_path, 'r') as f:
            return json.load(f)

    @staticmethod
    def write_json_file(dict_data, file_path):
        with open(file_path, 'w') as f:
            json.dump(dict_data, f)

    