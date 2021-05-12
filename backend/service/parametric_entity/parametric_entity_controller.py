from flask import Blueprint, Flask, request, jsonify
import os
import sys

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
parametric_entity_api = Blueprint('parametric_entity_api', __name__)

# endpoints
@parametric_entity_api.route('/', methods=['GET'])
def test_pe():
    return jsonify({"parametric": "1"})