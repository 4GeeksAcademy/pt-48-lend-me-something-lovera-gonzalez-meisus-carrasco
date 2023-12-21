from api.models import db

class Market(db.Model):
    __tablename__ = 'markets'
    id = db.Colunm(db.Integer, primary_key=True)
    name = db.Colunm(db.String(50), nullable=False)
    region = db.Colunm(db.String(50), nullable=False)
    headquarters = db.Colunm(db.String(50), nullable=False)
    currency = db.Colunm(db.String(50), nullable=False)
    opentime = db.Colunm(db.String(50), nullable=False)
    closetime = db.Colunm(db.String(50), nullable=False)

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

    