from api.models import db

from enum import Enum

class ItemType(Enum):
    STOCK = 'Stock'
    CRYPTO = 'Crypto'
    FOREX = 'Forex'
    COMMODITY = 'Commodity'


class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    item_type = db.Column(db.Enum(ItemType), nullable = False)
    item_symbol = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='portfolio')
    # user_id = user.id

    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'user_id': self.user.id,
            'item_type': self.item_type,
            'item_symbol': self.item_symbol
        }