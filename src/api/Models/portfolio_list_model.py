from api.models import db


class PortfolioList(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'))

    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'portfolio_id' : self.portfolio_id
        }