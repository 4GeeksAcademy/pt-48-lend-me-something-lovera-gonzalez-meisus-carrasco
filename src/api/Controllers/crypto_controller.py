from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.crypto_service import CryptoService

crypto_api = Blueprint("cripto", __name__)

@crypto_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = CryptoService.get_list()
    return jsonify(data), HTTPStatus.value


@crypto_api.route("/<string:asset_id>", methods=["GET"])
def get_by_asset_id(asset_id):
    [data, HTTPStatus] = CryptoService.get_by_asset_id(asset_id)
    return jsonify(data), HTTPStatus.value


@crypto_api.route('/', methods=["POST"])
def add():
    request_data = request.json
    [result, HTTPStatus] = CryptoService.add_list(request_data)
    return jsonify(result), HTTPStatus.value


@crypto_api.route('/', methods=['DELETE'])
def delete():
    [result, HTTPStatus] = CryptoService.delete()
    return jsonify(result), HTTPStatus.value