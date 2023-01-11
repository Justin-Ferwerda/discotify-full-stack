"""helper functions"""


def snake_case_to_camel_case(response_list):
    """changes snake case in keys to camelCase for FE"""

    for obj in response_list:
        for i in list(obj):
            first, *rest = i.split('_')
            index = ''.join([first.lower(), *map(str.title, rest)])
            obj[index] = obj.pop(i)

    return response_list

def camel_case_to_snake_case(data):
    """changes camel case to snake case for BE"""
    for i in list(data):
        index = ''.join(['_'+c.lower() if c.isupper() else c for c in i]).lstrip('_')
        data[index] = data.pop(i)

    return data
