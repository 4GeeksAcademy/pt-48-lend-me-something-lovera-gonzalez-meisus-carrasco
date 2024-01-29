from api.Models.forex_model import Forex
from api.models import db


class ForexRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Forex).all()
        return query

    @staticmethod
    def get_by_ticker(ticker):
        query = db.session.query(Forex).filter(Forex.ticker == ticker)
        return query

    @staticmethod
    def get_by_email(email):
        query = db.session.query(Forex).filter(Forex.email == email).first()
        return query

    @staticmethod
    def add_list(Forex_data):
        for ticker in Forex_data:
            Forex_to_be_added = Forex(
                ticker=ticker["ticker"],
                quoteTimestamp=ticker["quoteTimestamp"],
                bidPrice=ticker["bidPrice"],
                bidSize=ticker["bidSize"],
                askPrice=ticker["askPrice"],
                askSize=ticker["askSize"],
                midPrice=ticker["midPrice"],
            )
            db.session.add(Forex_to_be_added)
            db.session.commit()
        return True

    @staticmethod
    def delete():
        db.session.query(Forex).delete()
        db.session.commit()
        return True
