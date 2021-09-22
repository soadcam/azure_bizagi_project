import os
import sys
from flask import Flask
from utility.sql_server import open_connection, close_cursor

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
app_secret_key = app.config["APP_SECRET_KEY"]

class ParametricEntityProvider():

    # methods
    def get_all_identity_types(self):
        cnn = None 
        try:
            result = []
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  identity_type_id,
                                name
                        FROM    identityTypes """
            cursor.execute(query)
            rows = cursor.fetchall()
            for row in rows:
                result.append({
                    'identity_type_id': row[0],
                    'name': row[1]
                })
            return result
        finally:
            close_cursor(cnn, cursor)