from api.models import db


class Crypto(db.Model):
    __tablename_ = "cryptos"
    crypto_id = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=True)
    price = db.Column(db.Float, nullable=True)
    date = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<Crypto {self.name}, symbol: {self.id}"

    def serialize(self):
        return {
            'crypto_id' : self.crypto_id,
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "date": self.date,
        }
