from api.models import db

from enum import Enum

class ItemType(Enum):
    STOCK = 'Stock'
    CRYPTO = 'Crypto'
    FOREX = 'Forex'
    COMMODITY = 'Commodity'
class PortfolioList(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'))
    item_type = db.Column(db.Enum(ItemType), nullable = False)
    item_symbol = db.Column(db.String, nullable=False) 

    portfolio = db.relationship('Portfolio', back_populates='portfolio_list')


    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'portfolio_id' : self.portfolio_id,
            'item_type': self.item_type,
            'item_symbol': self.item_symbol
        }