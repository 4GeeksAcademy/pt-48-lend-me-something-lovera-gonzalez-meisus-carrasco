from api.Models.user_model import User
from api.models import db


class UserRepository:
    @staticmethod
    def get_list():
        query = db.session.query(User).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(User).filter(User.id == id)
        return query
    
    @staticmethod
    def get_by_email(email):
        query = db.session.query(User).filter(User.email == email).first()
        return query

    @staticmethod
    def add(user_data):
        user_to_be_added = User(
            email=user_data["email"],
            created_at=user_data["created_at"],
            country= user_data["country"] if "country" in user_data else None,
            city= user_data["city"] if "city" in user_data else None,
            street= user_data["street"] if "street" in user_data else None,
        )
        db.session.add(user_to_be_added)
        db.session.commit()
        return True

    @staticmethod
    def update(user_data):
        user_to_be_updated = db.session.query(User).filter(User.id == user_data["id"])
        if "email" in user_data: 
            user_to_be_updated.update(
                {User.email: user_data["email"]}, synchronize_session=False
            )
        if "country" in user_data:
            user_to_be_updated.update(
                {User.country: user_data["country"]}, synchronize_session=False
            )
        if "city" in user_data:
            user_to_be_updated.update(
                {User.city: user_data["city"]}, synchronize_session=False
            )
        if "street" in user_data:
            user_to_be_updated.update(
                {User.street: user_data["street"]}, synchronize_session=False
            )
        db.session.commit()
        query = db.session.query(User).filter(User.id == user_data["id"]).first()
        return query

    @staticmethod
    def delete(user_data):
        user_to_be_deleted = db.session.query(User).filter(User.id == user_data["id"]).first()
        db.session.delete(user_to_be_deleted)
        db.session.commit()
        return True