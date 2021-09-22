import os
import sys
import datetime
import jwt
from flask import Flask
from utility.encrypt import encrypt_string
from model.user import User
from utility.sql_server import open_connection, close_cursor

# initializations
root_folder = os.path.abspath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
app_secret_key = app.config["APP_SECRET_KEY"]

class UserProvider():

    # methods
    def login_user(self, user: User):
        cnn = None 
        try:
            cnn = open_connection()
            cursor = cnn.cursor()
            query = """ SELECT  user_id,
                                email
                        FROM    users
                        WHERE   email = ?
                                AND password = ? """
            params = (user.email, encrypt_string(user.password))
            cursor.execute(query, params)
            user_db = cursor.fetchone()
            if user_db is None:
                return user_db
            user.user_id = user_db[0]
            user.email = user_db[1]
            timeLimit = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            payload = {
                "user_id": user.user_id,
                "email": user.email,
                "exp": timeLimit
            }
            token = jwt.encode(payload, app_secret_key)
            return {
                "token": token,
                "elapse_time": f"{timeLimit}"
            }
        finally:
            close_cursor(cnn, cursor)

    def logout_user(self, token):
        payload = {
            "action": "DELETED",
            "token": token
        }
        jwt.encode(payload, app_secret_key)
