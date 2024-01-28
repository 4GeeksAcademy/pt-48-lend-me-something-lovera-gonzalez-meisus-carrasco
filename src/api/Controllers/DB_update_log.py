from api.models import db
from api.Services.HTTP_Status import HTTP_Status
from flask import Flask, request, jsonify, url_for, Blueprint

class UpdateLog(db.Model):
    __tablename__ = 'updatelogs'
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String, nullable=False)


    def __repr__(self):
        return f"<Updatelog: {self.id} with date {self.date}>"
    

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date
        }
    
class UpdateRepository:
    @staticmethod
    def get_list():
        query = db.session.query(UpdateLog).all()
        return query
    
    @staticmethod
    def add_log(log_data):
        log_to_be_added = UpdateLog(
            date=log_data["date"]
          )
        db.session.add(log_to_be_added)
        db.session.commit()
        return log_to_be_added

class UpdateService:
    @staticmethod
    def get_list():
        raw_data = UpdateRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
    
    @staticmethod
    def add_log(log_data):
        raw_data = UpdateRepository.add_log(log_data) 
        serialized_data = raw_data.serialize()
        return serialized_data, HTTP_Status.OK
    

log_api = Blueprint("log", __name__)

@log_api.route("/", methods=["GET"])
def get_list():
    [data, HTTPStatus] = UpdateService.get_list()
    return jsonify(data), HTTPStatus.value


@log_api.route("/", methods=["POST"])
def add_log():
    request_data = request.json
    [data, HTTPStatus] = UpdateService.add_log(request_data)
    return jsonify(data), HTTPStatus.value

