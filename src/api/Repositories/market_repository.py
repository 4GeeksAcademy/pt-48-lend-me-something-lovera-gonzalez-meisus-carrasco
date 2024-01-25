from api.Models.market_model import Market
from api.models import db


class MarketRepository:
    @staticmethod
    def get_market_list():
        query = db.session.query(Market).all()
        return query
        
    
    @staticmethod
    def get_market_by_id():
        query = db.session.query(Market).filter(Market.id == id)
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
        db.session.add(market_to_be_added)
        db.session.commit()
        return True
    
    @staticmethod
    def update_market(market_data):
        market_to_be_updated = db.session.query(Market).filter(Market.id == market_data["id"])

        if "name" in market_data:
            market_to_be_updated.update(
                {Market.name: market_data["name"]}, synchronize_session=False
            )
        if "region" in market_data:
            market_to_be_updated.update(
                {Market.region: market_data["region"]}, synchronize_session=False
            )
        if "headquarters" in market_data:
            market_to_be_updated.update(
                {Market.headquarters: market_data["headquarters"]}, synchronize_session=False
            )
        if "currency" in market_data:
            market_to_be_updated.update(
                {Market.currency: market_data["currency"]}, synchronize_session=False
            )
        if "opentime" in market_data:
            market_to_be_updated.update(
                {Market.opentime: market_data["opentime"]}, synchronize_session=False
            )
        if "closetime" in market_data:
            market_to_be_updated.update(
                {Market.closetime: market_data["closetime"]}, synchronize_session=False
            )

        db.session.commit()
        return True

    
    @staticmethod
    def delete_market(market_data):
        market_to_be_deleted = db.session.query(Market).filter(Market.id == market_data['id']).first()
        db.session.delete(market_to_be_deleted)
        db.session.commit()
        return True
        
