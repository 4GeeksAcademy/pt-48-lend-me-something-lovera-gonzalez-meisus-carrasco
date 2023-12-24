from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.value_service import ValueService

value_api = Blueprint("value", __name__)


@value_api.route("/", methods=["GET"])
def get_value_list():
    [data, HTTPStatus] = ValueService.get_list()
    return jsonify(data), HTTPStatus.value
