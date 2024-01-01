from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.user_service import UserService

user_api = Blueprint("user", __name__)


@user_api.route('/', methods=['GET'])
def get_list():
    [data, HTTPStatus] = UserService.get_list()
    return jsonify(data), HTTPStatus.value

