from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.user_service import UserService

user_api = Blueprint("user", __name__)


@user_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = UserService.get_list()
    return jsonify(data), HTTPStatus.value


@user_api.route("/", methods=["POST"])  # requieres a body with user_data dictionary
def add():
    request_data = request.json
    [response, HTTPStatus] = UserService.add(request_data)
    return jsonify(response), HTTPStatus.value


@user_api.route("/", methods=["PUT"])  # requieres a body with user_data dictionary
def update():
    request_data = request.json
    [response, HTTPStatus] = UserService.update(request_data)
    return jsonify(response), HTTPStatus.value
