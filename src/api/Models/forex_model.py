from api.models import db


class Forex(db.Model):
    __tablename__ = "forexs"
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    quoteTimestamp = db.Column(db.String, nullable=True)
    bidPrice = db.Column(db.Float, nullable=True)
    bidSize = db.Column(db.Float, nullable=True)
    askPrice = db.Column(db.Float, nullable=True)
    askSize = db.Column(db.Float, nullable=True)
    midPrice = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f"<Forex: {self.ticker}>"

    def serialize(self):
        return {
            "id": self.id,
            "ticker": self.ticker,
            "quoteTimestamp": self.quoteTimestamp,
            "bidPrice": self.bidPrice,
            "bidSize": self.bidSize,
            "askPrice": self.askPrice,
            "askSize": self.askSize,
            "midPrice": self.midPrice,
        }
