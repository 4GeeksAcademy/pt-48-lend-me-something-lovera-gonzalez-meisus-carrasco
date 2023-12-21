from api.Models.user_model import User
from engine import session


class UserRepository:
    @staticmethod
    def get_user_list():
        query = session.query(User).all()
        return query

    @staticmethod
    def get_user_by_id(id):
        query = session.query(User).filter(User.id == id)
        return query

    @staticmethod
    def add_user(user_data):
        user_to_be_added = User(
            email=user_data["email"],
            password=user_data["password"],
            created_at=user_data["created_at"],
        )
        session.add(user_to_be_added)
        session.commit()
        return True

    @staticmethod
    def update_user_email(user_data):
        user_to_be_updated = session.query(User).filter(User.id == user_data["id"])
        user_to_be_updated.update(
            {User.email: user_data["email"]}, synchronize_session=False
        )
        session.commit()
        return True

    @staticmethod
    def update_user_password(user_data):
        password_to_be_updated = session.query(User).filter(User.id == user_data["id"])
        password_to_be_updated.update(
            {User.password: user_data["password"]}, synchronize_session=False
        )
        session.commit()
        return True

    @staticmethod
    def delete_user(user_data):
        user_to_be_deleted = session.query(User).filter(User.id == user_data["id"])
        session.delete(user_to_be_deleted)
        session.commit()
        return True
