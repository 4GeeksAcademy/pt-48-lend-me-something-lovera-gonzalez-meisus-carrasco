from api.Models.crypto_model import Crypto
from api.models import db


class CryptoRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Crypto).all()
        return query

    @staticmethod
    def get_by_asset_id(asset_id):
        query = db.session.query(Crypto).filter(Crypto.asset_id == asset_id)
        return query

    @staticmethod
    def add_list(Crypto_data):
        for ticker in Crypto_data:
            Crypto_to_be_added = Crypto(
                asset_id=ticker["asset_id"],
                name=ticker["name"],
                price_usd=ticker["price_usd"] if "price_usd" in ticker else None,
                data_end=ticker["data_end"] if "data_end" in ticker else None,
            )
            db.session.add(Crypto_to_be_added)
            db.session.commit()
        return True

    @staticmethod
    def delete():
        db.session.query(Crypto).delete()
        db.session.commit()
        return True
