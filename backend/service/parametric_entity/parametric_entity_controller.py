import os
import sys
from flask import Blueprint, Flask, jsonify
from provider.parametric_entity_provider import ParametricEntityProvider

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
parametric_entity_api = Blueprint('parametric_entity_api', __name__)
parametric_entity_provider = ParametricEntityProvider()

# endpoints
@parametric_entity_api.route('/identity_type', methods=['GET'])
def get_all_identity_types():
    return jsonify(parametric_entity_provider.get_all_identity_types())

@parametric_entity_api.route('/test', methods=['GET'])
def test():
    return "Hello, Azure!"