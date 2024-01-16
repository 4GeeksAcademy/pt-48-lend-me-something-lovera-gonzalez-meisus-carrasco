from flask import request, jsonify, url_for, Blueprint
import requests

api_proxy = Blueprint("api_proxy", __name__)


@api_proxy.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy():
    target_url = request.args.get('url')
    symbols = request.args.get('symbols')
    # print(symbols)
    # print(target_url)
    if not target_url:
        return 'Error: No target URL provided.'

    try:
        if request.method == 'GET':
            response = requests.get(f'{target_url}&symbols={symbols}')
            print(response.json())
        else:
            return 'Error: Unsupported HTTP method.'

        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'
