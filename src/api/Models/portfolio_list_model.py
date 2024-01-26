from api.models import db

from enum import Enum


class ItemType(Enum):
    STOCK = "Stock"
    CRYPTO = "Crypto"
    FOREX = "Forex"
    COMMODITY = "Commodity"


class PortfolioList(db.Model):
    __tablename__ = "portfoliolist"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    item_type = db.Column(db.Enum(ItemType), nullable=False)
    item_symbol = db.Column(db.String, nullable=False)
    item_name = db.Column(db.String, nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id"))

    portfolio = db.relationship("Portfolio", back_populates="portfoliolist")

    def __repr__(self):
        return f"<PortfolioList: {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "item_type": self.item_type.value,
            "item_symbol": self.item_symbol,
            'item_name': self.item_name,
            "portfolio_id": self.portfolio.id,
        }
