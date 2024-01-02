from api.Models.market_model import Market
from engine import session


class MarketRepository:
    @staticmethod
    def get_market_list():
        query = session.query(Market).all()
        return query
        
    
    @staticmethod
    def get_market_by_id():
        query = session.query(Market).filter(Market.id == id)
        return query
    
    @staticmethod
    def add_market(market_data):
        market_to_be_added = Market(
            name=market_data["name"],
            region=market_data["region"],
            headquarters=market_data["headquarters"],
            currency=market_data["currency"],
            opentime=market_data["opentime"],
            closetime=market_data["closetime"],
        )
        session.add(market_to_be_added)
        session.commit()
        return True
    
    @staticmethod
    def update_market():
        return
    
    @staticmethod
    def delete_market():
        user_to_be_deleted = session.query(User).filter(User.id == user_data['id'])
        session.delete(user_to_be_deleted)
        session.commit()
        return True
        
