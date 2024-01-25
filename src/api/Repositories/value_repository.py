from api.Models.value_model import Value
from api.models import db


class ValueRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Value).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(Value).filter(Value.id == id)
        return query

    @staticmethod
    def add(value_data):
        value_to_be_added = Value(
            symbol=value_data["symbol"],
            name=value_data["name"],
            company=value_data["company"],
        )
        db.session.add(value_to_be_added)
        db.session.commit()
        return True

    @staticmethod
    def update(value_data):
        value_to_be_updated = db.session.query(Value).filter(Value.id == value_data["id"])
        if "name" in value_data:
            value_to_be_updated.update(
                {Value.name: value_data["name"]}, synchronize_session=False
            )
        if "symbol" in value_data:
            value_to_be_updated.update(
                {Value.symbol: value_data["symbol"]}, synchronize_session=False
            )
        if "company" in value_data:
            value_to_be_updated.update(
                {Value.company: value_data["company"]}, synchronize_session=False
            )
        db.session.commit()
        return True

    @staticmethod
    def delete(value_data):
        value_to_be_deleted = db.session.query(Value).filter(Value.id == value_data["id"]).first()
        db.session.delete(value_to_be_deleted)
        db.session.commit()
        return True
