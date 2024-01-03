from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.market_service import MarketService

value_api = Blueprint("market", __name__)


@value_api.route("/", methods=["GET"])
def get_market_list():
    [data, HTTPStatus] = MarketService.get_list()
    return jsonify(data), HTTPStatus.value
