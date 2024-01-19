from api.models import db

class Index(db.Model):
    __tablename__ = 'indices'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable =False)
    icon = db.Column(db.String, nullable =False)
    currency= db.Column(db.String, nullable=False)
    create_at =db.Column(db.String(50), nullable=False)
    symbol = db.Column(db.String, nullable =False)

    def __repr__(self):
        return f'<index:{self.name}>'
    
    def serialize(self):
        return {
           'name': self.name,
           'icon':self.icon,
           'currency':self.currency,
           'create_at':self.create_at,
           'symbol': self.symbol
        }

    
