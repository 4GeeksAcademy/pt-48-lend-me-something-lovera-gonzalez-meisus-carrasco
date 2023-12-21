from api.Models.value_model import Value
from engine import session


class ValueRepository:
    @staticmethod
    def get_value_list():
        query = session.query(Value).all()
        return query

    @staticmethod
    def get_value_by_id(id):
        query = session.query(Value).filter(Value.id == id)
        return query

    @staticmethod
    def add_value(value_data):
        value_to_be_added = Value(
            symbol=value_data["symbol"],
            name=value_data["name"],
            company=value_data["company"],
        )
        session.add(value_to_be_added)
        session.commit()
        return True

    @staticmethod
    def update_value_email(value_data):
        value_to_be_updated = session.query(Value).filter(Value.id == value_data["id"])
        if value_data["name"]:
            value_to_be_updated.update(
                {Value.name: value_data["name"]}, synchronize_session=False
            )
        if value_data["symbol"]:
            value_to_be_updated.update(
                {Value.symbol: value_data["symbol"]}, synchronize_session=False
            )
        if value_data["company"]:
            value_to_be_updated.update(
                {Value.company: value_data["company"]}, synchronize_session=False
            )
        session.commit()
        return True

    @staticmethod
    def delete_value(value_data):
        value_to_be_deleted = session.query(Value).filter(Value.id == value_data["id"])
        session.delete(value_to_be_deleted)
        session.commit()
        return True
