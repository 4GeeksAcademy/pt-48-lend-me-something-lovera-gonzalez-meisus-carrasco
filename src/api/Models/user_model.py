from models import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable = False, unique = True)
    password = db.Column(db.String, nullable= False)
    created_at = db.Column(db.String, nullable = False)


    def __repr__ (self):
        return f'<User: {self.email}>' 
    
    def serialize(self):
        return {
            'email' : self.email,
            'password' : self.password,
            'created_at' : self.created_at
        }
