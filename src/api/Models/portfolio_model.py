from api.models import db

from enum import Enum




class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='portfolio')
    portfoliolist = db.relationship("PortfolioList", back_populates="portfolio", uselist=False)
    # user_id = user.id

    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'user_id': self.user.id,
            'portfolio_list_id': self.portfolio_list.id  if self.portfolio_list else '',
        }