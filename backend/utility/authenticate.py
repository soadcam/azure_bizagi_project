import json
import jwt
from functools import wraps
from flask import Flask, request

app = Flask(__name__)
app.config.from_object('config')
SECRET_KEY = app.config["APP_SECRET_KEY"]

def token_required(something):
    def wrap():
        try:
            token_passed = request.headers['authorization']
            if request.headers['authorization'] != '' and request.headers['authorization'] != None:
                try:
                    jwt.decode(token_passed, SECRET_KEY, algorithms=['HS256'])
                    try:
                        return something()
                    except Exception as e:
                        return_data = {
                            "error": "4",
                            "message": "An error occured: "+str(e)
                        }
                        return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 500
                except jwt.exceptions.ExpiredSignatureError:
                    return_data = {
                        "error": "1",
                        "message": "An error occured: "+str(e)
                    }
                    return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 401
                except:
                    return_data = {
                        "error": "2",
                        "message": "Invalid Token"
                    }
                    return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 401
            else:
                return_data = {
                    "error": "3",
                    "message": "Token required",
                }
                return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 401
        except Exception as e:
            return_data = {
                "error": "5",
                "message": "An error occured: "+str(e)
            }
            return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 500
    wrap.__name__ = something.__name__
    return wrap

def get_session_attribute(attribute):
    try:
        token_passed = request.headers['authorization']
        if request.headers['authorization'] != '' and request.headers['authorization'] != None:
            data = jwt.decode(token_passed, SECRET_KEY, algorithms=['HS256'])
            return data[attribute]
    except Exception:
        return None
    return None
        
def get_session_user():
    try:
        token_passed = request.headers['authorization']
        if request.headers['authorization'] != '' and request.headers['authorization'] != None:
            data = jwt.decode(token_passed, SECRET_KEY, algorithms=['HS256'])
            return data
    except Exception:
        return None
    return None