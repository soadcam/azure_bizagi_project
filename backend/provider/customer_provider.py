import os
import sys
from flask import Flask
from model.customer import Customer
from utility.sql_server import open_connection, close_cursor

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
app_secret_key = app.config["APP_SECRET_KEY"]

class CustomerProvider():

    # methods
    def insert_customer(self, customer: Customer):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ INSERT INTO customers
                        (
                            fullname,
                            birthdate,
                            identity_type_id,
                            identity_number,
                            email,
                            phone,
                            salary
                        ) VALUES
                        (?, ?, ?, ?, ?, ?, ?);
                        SELECT SCOPE_IDENTITY() AS SCOPE_IDENTITY """
            params = (customer.fullname,
                        customer.birthdate,
                        customer.identity_type.identity_type_id,
                        customer.identity_number,
                        customer.email,
                        customer.phone,
                        customer.salary)
            cursor.execute(query, params)
            cursor.nextset()
            for credit_id in cursor:
                cnn.commit()
                return credit_id[0]
        finally:
            close_cursor(cnn, cursor)