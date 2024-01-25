from api.Models.portfolio_model import Portfolio
from api.models import db


class PortfolioRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Portfolio).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(Portfolio).filter(Portfolio.id == id)
        return query

    @staticmethod
    def add(item_data):
        portfolio_to_be_added = Portfolio(
            user_id=item_data["user_id"],
        )
        db.session.add(portfolio_to_be_added)
        db.session.commit()
        return True

    @staticmethod
    def delete(item_data):
        portfolio_to_be_deleted = (
            db.session.query(Portfolio).filter(Portfolio.id == item_data["id"]).first()
        )
        db.session.delete(portfolio_to_be_deleted)
        db.session.commit()
        return True
