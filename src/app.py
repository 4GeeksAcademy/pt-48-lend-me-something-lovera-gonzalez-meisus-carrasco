"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, redirect
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.Controllers.user_controller import user_api
from api.Controllers.value_controller import value_api
from api.Controllers.market_controller import market_api
from api.Controllers.api_proxy import api_proxy
from api.Controllers.index_controller import index_api
from api.Controllers.portfolio_controller import portfolio_api
from api.Controllers.portfolio_list_controller import portfolio_list_api
from api.Controllers.subscription_controller import subscription_api
from api.Controllers.authentication import authentication_api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
import stripe

stripe.api_key = "sk_test_51Oc1gPEUv4sos4iTbeF2C85cfQDBpGzWiVMnE3GcpSUhOqXJHY7VKGc24fNquJulJTOZoH3kYLUc8vPqBfYpt8dH00XtPRGLgJ"

YOUR_DOMAIN = os.getenv("REACT_APP_AUTH0_CALLBACK_URL")
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "../public/"
)
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgresql_trapezoidal_42170_p82p_user:ByYWc0FUl2jjWvdXoux4zPTf4j4k3CTf@dpg-cmpd19nqd2ns738qr950-a/postgresql_trapezoidal_42170_p82p"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix

# app.register_blueprint(api, name='api', url_prefix='/api')
app.register_blueprint(api_proxy, name="api_proxy", url_prefix="/api_proxy")
app.register_blueprint(user_api, name="user_api", url_prefix="/user")
app.register_blueprint(value_api, name="value_api", url_prefix="/value")
app.register_blueprint(market_api, name="market_api", url_prefix="/market")
app.register_blueprint(index_api, name="index_api", url_prefix="/index")
app.register_blueprint(portfolio_api, name="portfolio_api", url_prefix="/portfolio")
app.register_blueprint(
    portfolio_list_api, name="portfolio_list_api", url_prefix="/portfolio_list"
)
app.register_blueprint(
    subscription_api, name="subscription_api", url_prefix="/subscription"
)
app.register_blueprint(
    authentication_api, name="authentication_api", url_prefix="/authentication"
)


# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# generate sitemap with all your endpoints


@app.route("/")
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, "index.html")


@app.route("/redirect")
def redireccion():
    return redirect(
        "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3000.app.github.dev/", code=302
    )


# any other endpoint will try to serve it like a static file


# @app.route('/<path:path>', methods=['GET'])
# def serve_any_other_file(path):
#     if not os.path.isfile(os.path.join(static_file_dir, path)):
#         path = 'index.html'
#     response = send_from_directory(static_file_dir, path)
#     response.cache_control.max_age = 0  # avoid cache memory
#     return response

# Stripe implementation


@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        request_data = request.json
        print(request_data)
        session = stripe.checkout.Session.create(
            ui_mode="embedded",
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    "price": request_data["product_id"],
                    "quantity": 1,
                },
            ],
            mode="subscription",
            return_url=YOUR_DOMAIN + "return/{CHECKOUT_SESSION_ID}",
        )
    except Exception as e:
        return str(e)

    return jsonify(clientSecret=session.client_secret)


@app.route("/session-status/<string:session_id>", methods=["GET"])
def session_status(session_id):
    session = stripe.checkout.Session.retrieve(session_id)
    print(session)

    return jsonify(status=session.status, customer_email=session.customer_details.email, amount=session.amount_total)

@app.route('/stripe_webhook', methods=['POST'])
def stripe_webhook():
    event = None
    payload = request.data

    try:
        event = json.loads(payload)
       
    except json.decoder.JSONDecodeError as e:
        print('⚠️  Webhook error while parsing basic request.' + str(e))
        return jsonify(success=False)
    
    return jsonify(success=True)

# this only runs if `$ python src/main.py` is executed
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=True)
