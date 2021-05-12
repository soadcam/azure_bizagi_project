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