from api.Models.commodities_model import Commodity
from api.models import db


class CommodityRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Commodity).all()
        return query

    @staticmethod
    def get_by_key(key):
        query = db.session.query(Commodity).filter(Commodity.key == key)
        return query



    @staticmethod
    def add_list(Commodity_data):
        for ticker in Commodity_data:
            Commodity_to_be_added = Commodity(
                date=ticker["date"],
                value=ticker["value"],
                key=ticker["key"],
            )
            db.session.add(Commodity_to_be_added)
            db.session.commit()
        return True

    @staticmethod
    def delete():
        db.session.query(Commodity).delete()
        db.session.commit()
        return True
