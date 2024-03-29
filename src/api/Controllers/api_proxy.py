from flask import request, jsonify, url_for, Blueprint
import requests

API_KEY = '9883c939aa815f94accdfa4b810eac97'
api_proxy = Blueprint("api_proxy", __name__)


@api_proxy.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy():
    target_url = request.args.get('url')
    symbols = request.args.get('symbols')
    print(f'Llamada de end of day al symbolo: {symbols}')
    # print(target_url)
    if not target_url:
        return 'Error: No target URL provided.'

    try:
        if request.method == 'GET':
            response = requests.get(f'{target_url}&symbols={symbols}')
            # print(response.json())
        else:
            return 'Error: Unsupported HTTP method.'

        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'
    
@api_proxy.route('/searchbar/', methods=['GET'])
def proxy_search():
    target_url = request.args.get('url')
    symbols = request.args.get('symbols')
    exchange = request.args.get('exchange')
    offset = request.args.get('offset')
    print(f'Llamada de search al symbolo: {symbols}')
    if (offset is None): offset = ''
    if (exchange is None): exchange = ''
    # print(symbols)
    # print(f'{target_url}&search={symbols}')
    # print((f'{target_url}?offset={offset}&exchange={exchange}&search={symbols}'))
    if not target_url:
        return 'Error: No target URL provided.'

    try:
        if request.method == 'GET':
            response = requests.get(f'{target_url}?offset={offset}&exchange={exchange}&search={symbols}')
            # print(response.json())
        else:
            return 'Error: Unsupported HTTP method.'

        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'
    

    
@api_proxy.route('/ticker/', methods=['GET'])
def ticker():
    target_url = request.args.get('url')
    symbols = request.args.get('symbols')
    print(f'Llamada de ticker al symbolo: {symbols}')
    # print(symbols)
    # print(f'{target_url}&search={symbols}')
    if not target_url:
        return 'Error: No target URL provided.'

    try:
        if request.method == 'GET':
            response = requests.get(f'{target_url}/tickers/{symbols}?access_key={API_KEY}')
            # print(response.json())
        else:
            return 'Error: Unsupported HTTP method.'

        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'
