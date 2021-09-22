from functools import wraps
from flask import request

def convert_input_to(class_):
    def wrap(f):
        @wraps(f)
        def decorator(*args):
            obj = class_(**request.get_json())
            return f(obj)
        return decorator
    return wrap

class dic_to_obj(object):
    def __init__(self, d):
        for a, b in d.items():
            if isinstance(b, (list, tuple)):
               setattr(self, a, [dic_to_obj(x) if isinstance(x, dict) else x for x in b])
            else:
               setattr(self, a, dic_to_obj(b) if isinstance(b, dict) else b)