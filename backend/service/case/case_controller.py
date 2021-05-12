from flask import Blueprint, Flask, request, jsonify
import os
import sys

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
case_api = Blueprint('case_api', __name__)

# endpoints
@case_api.route('/', methods=['GET'])
def test_case():
    return jsonify({"case": "1"})