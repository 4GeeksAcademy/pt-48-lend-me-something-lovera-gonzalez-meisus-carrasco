from api.models import db

from enum import Enum




class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='portfolio')
    portfolio_list = db.relationship("PortfolioList", back_populates="portfolio")
    # user_id = user.id

    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'item_symbol': self.item_symbol
        }