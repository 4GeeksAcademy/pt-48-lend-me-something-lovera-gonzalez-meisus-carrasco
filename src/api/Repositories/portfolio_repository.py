from api.Models.portfolio_model import Portfolio
from api.engine import session


class PortfolioRepository:
    @staticmethod
    def get_list():
        query = session.query(Portfolio).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = session.query(Portfolio).filter(Portfolio.id == id)
        return query

    @staticmethod
    def add(id):
        portfolio_to_be_added = Portfolio(
            user_id=id,
        )
        session.add(portfolio_to_be_added)
        session.commit()
        return True

    @staticmethod
    def delete(item_data):
        portfolio_to_be_deleted = (
            session.query(Portfolio).filter(Portfolio.id == item_data["id"]).first()
        )
        session.delete(portfolio_to_be_deleted)
        session.commit()
        return True
