"""helper functions"""


def case_changer(response_list):
    """changes snake case in keys to camelCase for FE"""

    for obj in response_list:
        for i in list(obj):
            first, *rest = i.split('_')
            index = ''.join([first.lower(), *map(str.title, rest)])
            obj[index] = obj.pop(i)

    return response_list
