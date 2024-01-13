from flask import Flask, request, jsonify, url_for, Blueprint
from api.Services.index_service import IndexService

index_api = Blueprint("index", __name__)

@index_api.route("/", methods=["GET"])
def get_index_list(): 
    [data, HTTPStatus] = IndexService.get_list()
    return jsonify(data), HTTPStatus.value


