from api.models import db

class Market(db.Model):
    __tablename__ = 'markets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50), nullable=False)
    headquarters = db.Column(db.String(50), nullable=False)
    currency = db.Column(db.String(50), nullable=False)
    opentime = db.Column(db.String(50), nullable=False)
    closetime = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Market {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "region": self.region,
            "headquarters": self.headquarters,
            "currency": self.curency,
            "opentime": self.opentime,
            "closetime": self.closetime,
        }

    