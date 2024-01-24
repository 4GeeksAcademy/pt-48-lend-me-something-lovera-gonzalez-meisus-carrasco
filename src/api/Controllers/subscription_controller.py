from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.subscription_service import SubscriptionService

subscription_api = Blueprint("subscription", __name__)


@subscription_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = SubscriptionService.get_list()
    return jsonify(data), HTTPStatus.value


@subscription_api.route("/<int:id>", methods=["GET"])
def get(id):
    [data, HTTPStatus] = SubscriptionService.get_by_id(id)
    return jsonify(data), HTTPStatus.value


@subscription_api.route("/<int:id>", methods=["GET"])
def get_by_user_id(id):
    [data, HTTPStatus] = SubscriptionService.get_by_user_id(id)
    return jsonify(data), HTTPStatus.value

@subscription_api.route("/", methods=["POST"])  # requieres a body with user_data dictionary
def add():
    request_data = request.json
    [response, HTTPStatus] = SubscriptionService.add(request_data)
    return jsonify(response), HTTPStatus.value


@subscription_api.route("/", methods=["PUT"])  # requieres a body with user_data dictionary
def update():
    request_data = request.json
    [response, HTTPStatus] = SubscriptionService.update(request_data)
    return jsonify(response), HTTPStatus.value

