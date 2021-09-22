from flask import Blueprint, Flask, send_file, request, jsonify
from model.credit import Credit
from model.credit_evaluation import CreditEvaluation
from utility.request_object import convert_input_to, dic_to_obj
from utility.authenticate import token_required, get_session_user
from provider.credit_provider import CreditProvider
import os
import sys
import uuid

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
credit_api = Blueprint('credit_api', __name__)
credit_provider = CreditProvider()

# endpoints
@credit_api.route('/property', methods=['POST'])
def save_property():
    file_dir = os.path.join(app.config['UPLOAD_FILES_PATH'], str(uuid.uuid1()))
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)
    property = request.files['property']
    property_full_path = os.path.join(file_dir, property.filename)
    credit_id = credit_provider.save_property(property, property_full_path, file_dir)
    return jsonify({'credit_id': int(credit_id)})

@credit_api.route('/', methods=['POST'])
@convert_input_to(Credit)
def insert_credit(credit: Credit):
    credit.customer = dic_to_obj(credit.customer)
    credit.credit_id = credit_provider.insert_credit(credit)
    return ('', 204)

@credit_api.route('/evaluate', methods=['POST'])
@token_required
@convert_input_to(CreditEvaluation)
def evaluate_credit(credit_evaluation: CreditEvaluation):
    user = get_session_user()
    credit_evaluation.user_id = user['user_id']
    credit_provider.evaluate_credit(credit_evaluation)
    credit_provider.send_email_evaluation(credit_evaluation)
    return ('', 204)

@token_required
@credit_api.route('/<credit_id>', methods=['GET'])
def get_credit(credit_id: int):
    credit = credit_provider.get_credit(credit_id)
    return jsonify(credit)

@credit_api.route('/analyst', methods=['GET'])
@token_required
def get_credits():
    credits = credit_provider.get_open_credits_ready_to_process()
    return jsonify(credits)

@token_required
@credit_api.route('/<credit_id>/download/format', methods=['GET'])
def get_format_credit(credit_id: int):
    credit_format = credit_provider.get_format_url_credit(credit_id)
    return send_file(credit_format, mimetype='application/pdf', as_attachment=True)

@token_required
@credit_api.route('/<credit_id>/download/property', methods=['GET'])
def get_property_credit(credit_id: int):
    credit_format = credit_provider.get_property_url_credit(credit_id)
    return send_file(credit_format, mimetype='image/png', as_attachment=True)