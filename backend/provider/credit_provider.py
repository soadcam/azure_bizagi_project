import os
import sys
import os.path
from flask import Flask, config
from flask_mail import Message, Mail
from model.credit import Credit
from model.credit_evaluation import CreditEvaluation
from provider.customer_provider import CustomerProvider
from utility.sql_server import open_connection, close_cursor
from utility.blob_storage import create_container, upload_file
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
mail = Mail(app)
app_secret_key = app.config["APP_SECRET_KEY"]
customer_provider = CustomerProvider()

# Create a directory in a known location to save files to.
uploads_dir = os.path.join(app.instance_path, 'generated')
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

class CreditProvider():

    # methods
    def save_property(self, property: FileStorage, container: str, file_dir: str):
        cnn = None
        property_full_path = os.path.join(file_dir, property.filename)
        property.save(property_full_path)
        create_container(container)
        url_file = upload_file(container, property.filename, property_full_path)
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ INSERT INTO credits (property_url_original, upload_url_path) VALUES (?, ?);
                        SELECT SCOPE_IDENTITY() AS credit_id """
            params = (url_file,
                        container)
            cursor.execute(query, params)
            cursor.nextset()
            for credit_id in cursor:
                cnn.commit()
                return credit_id[0]
        finally:
            close_cursor(cnn, cursor)

    def insert_credit(self, credit: Credit):
        credit.customer.customer_id = int(customer_provider.insert_customer(customer=credit.customer))
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ UPDATE  credits
                            SET amount_requested = ?,
                                comments = ?,
                                customer_id = ?
                        WHERE   credit_id = ?"""
            params = (credit.amount_requested,
                        credit.comments,
                        credit.customer.customer_id,
                        credit.credit_id)
            cursor.execute(query, params)
            cnn.commit()
        finally:
            close_cursor(cnn, cursor)

    def evaluate_credit(self, credit_evaluation: CreditEvaluation):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ INSERT INTO creditEvaluations
                        (
                            credit_id, 
                            user_id, 
                            is_approved, 
                            comments
                        ) VALUES
                        (?, ?, ?, ?) """
            params = (credit_evaluation.credit_id,
                        credit_evaluation.user_id,
                        credit_evaluation.is_approved,
                        credit_evaluation.comments)
            cursor.execute(query, params)
            cnn.commit()
        finally:
            close_cursor(cnn, cursor)

    def send_email_evaluation(self, credit_evaluation: CreditEvaluation):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  cu.email
                        FROM	credits c
                        INNER JOIN customers cu
                            ON	c.customer_id = cu.customer_id
                        WHERE	c.credit_id = ? """
            params = (credit_evaluation.credit_id,)
            cursor.execute(query, params)
            credit_db = cursor.fetchone()
            to = credit_db[0]
            msg = Message('Resultado Aprobacion Microcredito', sender=app.config['MAIL_DEFAULT_SENDER'], recipients = [to])
            approval_message = "Su credito ha sido aprobado y uno de nuestros analistas se contactara con usted para indicarle el resto del proceso."
            reject_message = "Su credito ha sido rechazado. De acuerdo a las siguientes observaciones: " + credit_evaluation.comments
            msg.body = approval_message if credit_evaluation.is_approved else reject_message
            mail.send(msg)
        finally:
            close_cursor(cnn, cursor)

    def get_open_credits_ready_to_process(self):
        cnn = None 
        try:
            result = []
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  c.credit_id,
                                cu.fullname,
                                cu.identity_number,
                                c.amount_requested,
                                c.date_requested 
                        FROM    credits c
                        INNER JOIN customers cu
                            ON  c.customer_id = cu.customer_id
                        LEFT JOIN creditEvaluations ce
                            ON  c.credit_id = ce.credit_id
                        WHERE   ce.credit_evaluation_id IS NULL 
                        		AND c.property_url_modified IS NOT NULL
		                        AND c.format_credit_url IS NOT NULL
                        ORDER BY c.date_requested DESC """
            cursor.execute(query)
            rows = cursor.fetchall()
            for row in rows:
                result.append({
                    'credit_id': row[0],
                    'fullname': row[1],
                    'identity_number': row[2],
                    'amount_requested': float(row[3]),
                    'date_requested': row[4],
                })
            return result
        finally:
            close_cursor(cnn, cursor)

    def get_credit(self, credit_id: int):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  amount_requested,
                                comments,
                                property_url_modified,
                                format_credit_url
                        FROM    credits
                        WHERE   credit_id = ?
                                """   
            params = (credit_id,)
            cursor.execute(query, params)
            credit_db = cursor.fetchone()
            if credit_db is None:
                return credit_db
            return ({
                'amount_requested': float(credit_db[0]),
                'comments': credit_db[1],
                'property_url_modified': credit_db[2],
                'format_credit_url': credit_db[3],
            })
        finally:
            close_cursor(cnn, cursor)

    def get_format_url_credit(self, credit_id: int):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  format_credit_url
                        FROM    credits
                        WHERE   credit_id = ?
                                """   
            params = (credit_id,)
            cursor.execute(query, params)
            credit_db = cursor.fetchone()
            if credit_db is None:
                return credit_db
            return credit_db[0]
        finally:
            close_cursor(cnn, cursor)

    def get_property_url_credit(self, credit_id: int):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  property_url_modified
                        FROM    credits
                        WHERE   credit_id = ?
                                """   
            params = (credit_id,)
            cursor.execute(query, params)
            credit_db = cursor.fetchone()
            if credit_db is None:
                return credit_db
            return credit_db[0]
        finally:
            close_cursor(cnn, cursor)