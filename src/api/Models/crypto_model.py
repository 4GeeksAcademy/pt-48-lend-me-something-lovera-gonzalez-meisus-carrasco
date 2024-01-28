from api.models import db


class Crypto(db.Model):
    __tablename_ = "cryptos"
    crypto_id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.String, nullable=True)
    name = db.Column(db.String, nullable=True)
    price_usd = db.Column(db.Float, nullable=True)
    data_end = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<Crypto {self.name}, symbol: {self.asset_id}"

    def serialize(self):
        return {
            'crypto_id' : self.crypto_id,
            "asset_id": self.asset_id,
            "name": self.name,
            "price_usd": self.price_usd,
            "data_end": self.data_end,
        }

        
