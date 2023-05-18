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

    @staticmethod
    def is_dict_empty(d):
        return bool(d)

    @staticmethod
    def empty_or_none(t):
        if t == "" or t == None:
            return True
        return False

    @staticmethod
    def check_yes(option_text):
        response = input(f"{option_text} [N/y]: ")
        if Util.empty_or_none(response):
            return False
        if response[0].lower() == "y":
            return True
        
        return False

    @staticmethod
    def confirm_choice(confirm_text):
        response = input(f"{confirm_text} [N/y]: ")
        if Util.empty_or_none(response):
            return False
        if response[0].lower() == "q":
            Util.quit_setup()
        if response[0].lower() == "y":
            return True
        
        return False

    @staticmethod
    def quit_setup():
        print("\nExiting setup...")
        quit()
