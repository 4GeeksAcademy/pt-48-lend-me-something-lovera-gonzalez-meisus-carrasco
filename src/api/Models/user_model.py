from api.models import db
from api.Models.subscription_model import Subscription


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable = False, unique = True)
    created_at = db.Column(db.String, nullable = False)
    country = db.Column(db.String, nullable = True)
    city = db.Column(db.String, nullable = True)
    street = db.Column(db.String, nullable = True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'), unique=True, nullable=False)

    subscription = db.relationship('Subscription', back_populates='user')

    def __repr__ (self):
        return f'<User: {self.email}>' 
    
    def serialize(self):
        return {
            'id' : self.id,
            'email' : self.email,
            'created_at' : self.created_at,
            'country' : self.country,
            'city' : self.city,
            'street' : self.street
        }
