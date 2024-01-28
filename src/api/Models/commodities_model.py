from api.models import db


class Commodity(db.Model):
    __tablename_ = "commodities"
    commodity_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String, nullable=True)
    value = db.Column(db.Float, nullable=True)
    key = db.Column(db.String, nullable=True)
    updated = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<Commodity {self.key}>"

    def serialize(self):
        return {
            'commodity_id' : self.commodity_id,
            "date": self.date,
            "value": self.value,
            "key": self.key,
            "updated": self.updated,
        }

        
