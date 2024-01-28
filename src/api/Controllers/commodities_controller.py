from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.commdities_service import CommodityService

commodity_api = Blueprint("commodity", __name__)

@commodity_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = CommodityService.get_list()
    return jsonify(data), HTTPStatus.value


@commodity_api.route("/<string:key>", methods=["GET"])
def get_by_key(key):
    [data, HTTPStatus] = CommodityService.get_by_key(key)
    return jsonify(data), HTTPStatus.value


@commodity_api.route('/', methods=["POST"])
def add():
    request_data = request.json
    [result, HTTPStatus] = CommodityService.add_list(request_data)
    return jsonify(result), HTTPStatus.value


@commodity_api.route('/', methods=['DELETE'])
def delete():
    [result, HTTPStatus] = CommodityService.delete()
    return jsonify(result), HTTPStatus.value