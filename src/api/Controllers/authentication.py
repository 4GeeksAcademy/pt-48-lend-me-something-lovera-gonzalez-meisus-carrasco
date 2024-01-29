from flask import Flask, request, jsonify, url_for, Blueprint,redirect
from api.Services.user_service import UserService

authentication_api = Blueprint("authentication", __name__)

@authentication_api.route('/', methods=['POST', 'GET', 'PUT', 'DELETE'])
def handleAuth0login():
    code = request.args.get('code')
    state = request.args.get('state')
    print(code, state)
    return redirect(
        location=f'https://studious-space-sniffle-jjpp6wvv5wfj7q6-3000.app.github.dev?code={code}&state={state}', code=302
    )