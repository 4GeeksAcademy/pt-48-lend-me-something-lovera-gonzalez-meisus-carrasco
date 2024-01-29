from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.forex_service import ForexService

forex_api = Blueprint("forex", __name__)

@forex_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = ForexService.get_list()
    return jsonify(data), HTTPStatus.value


@forex_api.route("/<string:ticker>", methods=["GET"])
def get_by_ticker(ticker):
    [data, HTTPStatus] = ForexService.get_by_ticker(ticker)
    return jsonify(data), HTTPStatus.value


@forex_api.route('/', methods=["POST"])
def add():
    request_data = request.json
    [result, HTTPStatus] = ForexService.add_list(request_data)
    return jsonify(result), HTTPStatus.value


@forex_api.route('/', methods=['DELETE'])
def delete():
    [result, HTTPStatus] = ForexService.delete()
    return jsonify(result), HTTPStatus.value