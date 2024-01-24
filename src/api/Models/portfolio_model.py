from api.models import db


class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    id = db.Column(db.Integer, nullable =False, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    portfolio_list_id = db.Column(db.Integer, db.ForeignKey('portfolio_lists.id'))

    def __repr__ (self):
        return f'<Portfolio: {self.id}>'  

    def serialize (self):
        return {
            'id' : self.id,
            'user_id': self.user_id,
            'portfolio_list_id' : self.portfolio_list_id
        }