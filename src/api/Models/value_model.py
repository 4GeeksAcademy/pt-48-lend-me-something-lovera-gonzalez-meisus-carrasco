from api.models import db


class Symbol(db.Model):
    __tablename_ = "symbols"
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Value {self.name}, ticker: {self.symbol}"

    def serialize(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "name": self.name,
            "company": self.company,
        }
