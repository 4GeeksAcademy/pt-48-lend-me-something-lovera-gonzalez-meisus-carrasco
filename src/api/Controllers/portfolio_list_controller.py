from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.portfolio_list_service import PortfolioListService

portfolio_list_api = Blueprint("portfolio_list", __name__)


@portfolio_list_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = PortfolioListService.get_list()
    return jsonify(data), HTTPStatus.value


# @portfolio_list_api.route("/<int:id>", methods=["GET"])
# def get(id):
#     [data, HTTPStatus] = PortfolioListService.get_by_id(id)
#     return jsonify(data), HTTPStatus.value


@portfolio_list_api.route("/<int:id>", methods=["GET"])
def get_by_portfolio(id):
    [data, HTTPStatus] = PortfolioListService.get_by_portfolio_id(id)
    return jsonify(data), HTTPStatus.value


@portfolio_list_api.route(
    "/", methods=["POST"]
)  # requieres a body with user_data dictionary
def add():
    request_data = request.json
    [response, HTTPStatus] = PortfolioListService.add(request_data)
    return jsonify(response), HTTPStatus.value


@portfolio_list_api.route(
    "/", methods=["DELETE"]
)  # requieres a body with user_data dictionary
def delete():
    request_data = request.json
    [response, HTTPStatus] = PortfolioListService.delete(request_data)
    return jsonify(response), HTTPStatus.value
