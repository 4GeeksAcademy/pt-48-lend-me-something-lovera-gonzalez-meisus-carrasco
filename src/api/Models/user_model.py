from api.models import db
from api.Models.portfolio_model import Portfolio
from api.Models.subscription_model import Subscription


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    street = db.Column(db.String, nullable=True)
   

    subscription = db.relationship("Subscription", back_populates="user", uselist=False)
    portfolio = db.relationship("Portfolio", back_populates="user", uselist=False)


    def __repr__(self):
        return f"<User: {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at,
            "country": self.country,
            "city": self.city,
            "street": self.street,
            "subscription_id": self.subscription.id if self.subscription else '',
            "subscription_level": self.subscription.level.value  if self.subscription else '',
            "subscription_start_date": self.subscription.start_date if self.subscription else '',
            "subscription_end_date": self.subscription.end_date  if self.subscription else '',
            "subscription_renew_date": self.subscription.renew_date if self.subscription else '',
            "subscription_stripe": self.subscription.subscription_stripe if self.subscription else '',
            "portfolio_id": self.portfolio.id if self.portfolio else ''
            
        }
