from api.Models.portfolio_list_model import PortfolioList
from api.engine import session


class PortfolioListRepository:
    @staticmethod
    def get_list():
        query = session.query(PortfolioList).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = session.query(PortfolioList).filter(PortfolioList.id == id)
        return query

    @staticmethod
    def get_by_portfolio_id(id):
        query = session.query(PortfolioList).filter(PortfolioList.portfolio_id == id)
        return query

    @staticmethod
    def add(item_data):
        item_to_be_added = PortfolioList(
            portfolio_id=item_data["portfolio_id"],
            item_type=item_data["item_type"],
            item_symbol=item_data["item_symbol"],
        )
        session.add(item_to_be_added)
        session.commit()
        return True

    @staticmethod
    def delete(item_data):
        item_to_be_deleted = (
            session.query(PortfolioList)
            .filter(PortfolioList.id == item_data["id"])
            .first()
        )
        session.delete(item_to_be_deleted)
        session.commit()
        return True
