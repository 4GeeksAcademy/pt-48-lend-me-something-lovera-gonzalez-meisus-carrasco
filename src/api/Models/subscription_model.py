from api.models import db
from enum import Enum


class SubscriptionLevel(Enum):
    FREE = 'Free'
    ESSENTIAL = 'Essential'
    BUSINESS = 'Business'

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id = db.Column(db.Integer, primary_key = True)
    level = db.Column(db.Enum(SubscriptionLevel), nullable = False)
    start_date = db.Column(db.String, nullable = True)
    end_date = db.Column(db.String, nullable = True)
    renew_date = db.Column(db.String, nullable = True)
    subscription_stripe = db.Column(db.String, nullable=True)
    user_id = db.Column(db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='subscription')

    def __repr__ (self):
        return f'<Subscription: {self.id}>' 
    
    def serialize(self):
        return {
            'id' : self.id, 
            'user_id': self.user_id,
            'user_email': self.user.email, 
            'level' : self.level.value, 
            'start_date' : self.start_date, 
            'end_date' : self.end_date, 
            'renew_date' : self.renew_date,
            'stripe_sub': self.subscription_stripe
        }