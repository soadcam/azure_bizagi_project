import pyodbc
import os
import sys
from flask import Flask

# initializations
root_folder = os.path.abspath(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
db_server = app.config["SQL_SERVER_SERVER"]
db_database_name = app.config["SQL_SERVER_DATABASE_NAME"]
db_username = app.config["SQL_SERVER_USERNAME"]
db_password = app.config["SQL_SERVER_PASSWORD"]
db_connection_string = 'DRIVER={SQL Server};SERVER=' + \
    db_server+';DATABASE='+db_database_name + \
    ';UID='+db_username+';PWD=' + db_password

def open_connection():
    return pyodbc.connect(db_connection_string)

def close_cursor(cnn, cursor):
    if(cnn):
        cursor.close()
        cnn.close()