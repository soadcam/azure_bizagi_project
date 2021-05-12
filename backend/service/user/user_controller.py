from utility.request_object import convert_input_to
from utility.authenticate import token_required, get_session_user
from model.user import User
from provider.user_provider import UserProvider
from flask import Blueprint, Flask, request, jsonify
import json
import os
import sys

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
user_api = Blueprint('account_api', __name__)
user_provider = UserProvider()

# endpoints
@user_api.route('/', methods=['GET'])
def test_user():
    return jsonify({"user": "1"})

@user_api.route("/login", methods=['POST'])
@convert_input_to(User)
def login(user: User):
    try:
        token_response = user_provider.login_user(user)
        if token_response is None:
            return_data = {
                "error": "4",
                "message": "User not found"
            }
            return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 400
        return app.response_class(response=json.dumps(token_response), mimetype='application/json')
    except (Exception) as error:
        return_data = {
            "error": "1",
            "message": "Error login user: "+str(error)
        }
        return app.response_class(response=json.dumps(return_data), mimetype='application/json'), 500

@user_api.route('/me',methods=['GET'])
@token_required
def get_current_user():
    user = get_session_user()
    return jsonify(user)

@user_api.route('/logout',methods=['DELETE'])
@token_required
def logout():
    user_provider.logout_user(request.headers['authorization'])
    return_data = {
        "message": "User logout"
    }
    return app.response_class(response=json.dumps(return_data), mimetype='application/json')