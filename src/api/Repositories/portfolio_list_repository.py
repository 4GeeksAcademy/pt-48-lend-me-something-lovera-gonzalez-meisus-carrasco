from api.Models.portfolio_list_model import PortfolioList
from api.models import db


class PortfolioListRepository:
    @staticmethod
    def get_list():
        query = db.session.query(PortfolioList).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(PortfolioList).filter(PortfolioList.id == id)
        return query

    @staticmethod
    def get_by_portfolio_id(id):
        query = db.session.query(PortfolioList).filter(PortfolioList.portfolio_id == id)
        return query

    @staticmethod
    def add(item_data):
        item_to_be_added = PortfolioList(
            portfolio_id=item_data["portfolio_id"],
            item_type=item_data["item_type"],
            item_symbol=item_data["item_symbol"],
        )
        db.session.add(item_to_be_added)
        db.session.commit()
        return True

    @staticmethod
    def delete(item_data):
        item_to_be_deleted = (
            db.session.query(PortfolioList)
            .filter(PortfolioList.id == item_data["id"])
            .first()
        )
        db.session.delete(item_to_be_deleted)
        db.session.commit()
        return True
