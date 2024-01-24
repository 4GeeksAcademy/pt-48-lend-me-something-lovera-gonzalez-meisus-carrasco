from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.portfolio_service import PortfolioService

portfolio_api = Blueprint("portfolio", __name__)


@portfolio_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = PortfolioService.get_list()
    return jsonify(data), HTTPStatus.value


@portfolio_api.route("/<int:id>", methods=["GET"])
def get_portfolio(id):
    [data, HTTPStatus] = PortfolioService.get_by_id(id)
    return jsonify(data), HTTPStatus.value

@portfolio_api.route("/", methods=["POST"])  # requieres a body with user_data dictionary
def add():
    request_data = request.json
    [response, HTTPStatus] = PortfolioService.add(request_data)
    return jsonify(response), HTTPStatus.value


@portfolio_api.route("/", methods=["DELETE"])  # requieres a body with user_data dictionary
def delete():
    request_data = request.json
    [response, HTTPStatus] = PortfolioService.delete(request_data)
    return jsonify(response), HTTPStatus.value
