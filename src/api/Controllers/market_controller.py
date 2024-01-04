from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.market_service import MarketService

market_api = Blueprint("market", __name__)


@market_api.route("/", methods=["GET"])
def get_market_list():
    [data, HTTPStatus] = MarketService.get_market_list()
    return jsonify(data), HTTPStatus.value
