from flask import Flask
from flask_cors import CORS
from service.user.user_controller import user_api
from service.parametric_entity.parametric_entity_controller import parametric_entity_api
from service.case.case_controller import case_api

# initializations
app = Flask(__name__)
app.config.from_object('config')
app.url_map.strict_slashes = False
CORS(app)

# settings
port = app.config["PORT"]
debug = app.config["DEBUG"]
app_secret_key = app.config["APP_SECRET_KEY"]

# secret key
app.secret_key = app_secret_key

# routes
app.register_blueprint(user_api, url_prefix='/api/users')
app.register_blueprint(case_api, url_prefix='/api/cases')
app.register_blueprint(parametric_entity_api, url_prefix='/api/parametric_entities')

@app.route("/")
def hello():
  return "Hello World!"

# start app
if __name__ == "__main__":
  app.run(port = port, debug = debug)