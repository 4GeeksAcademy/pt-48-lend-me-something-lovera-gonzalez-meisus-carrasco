from api.Models.user_model import User
from api.engine import session


class UserRepository:
    @staticmethod
    def get_list():
        query = session.query(User).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = session.query(User).filter(User.id == id)
        return query

    @staticmethod
    def add(user_data):
        user_to_be_added = User(
            email=user_data["email"],
            created_at=user_data["created_at"],
            country= user_data["country"] if user_data['country'] else None,
            city= user_data["city"] if user_data['city'] else None,
            street= user_data["street"] if user_data['street'] else None,
        )
        session.add(user_to_be_added)
        session.commit()
        return True

    @staticmethod
    def update(user_data):
        user_to_be_updated = session.query(User).filter(User.id == user_data["id"])
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
        session.commit()
        return True

    @staticmethod
    def delete(user_data):
        user_to_be_deleted = session.query(User).filter(User.id == user_data["id"]).first()
        session.delete(user_to_be_deleted)
        session.commit()
        return True
