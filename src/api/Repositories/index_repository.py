from api.Models.index_model import Index
from api.models import db

class IndexRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Index).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(Index).filter(Index.id == id).first()
        return query

    @staticmethod
    def add(index_data):
        index_to_be_added = Index(
            name=index_data["name"],
            icon=index_data["icon"],
            currency=index_data["currency"],
            create_at=index_data["create_at"],

        )
        db.session.add(index_to_be_added)
        db.session.commit()
        return True


    @staticmethod
    def delete(index_data):
        index_to_be_deleted = db.session.query(Index).filter(Index.name == index_data["name"])
        db.session.delete(index_to_be_deleted)
        db.session.commit()
        return True

    @staticmethod
    def update(index_data):
        index_to_be_updated = db.session.query(Index).filter(Index.name == index_data["name"])

        if "name" in index_data:
            index_to_be_updated.update(
                {Index.name: index_data["name"]}, synchronize_session=False
            )
        if "icon" in index_data:
            index_to_be_updated.update(
                {Index.icon: index_data["icon"]}, synchronize_session=False
            )
        if "currency" in index_data:
            index_to_be_updated.update(
                {Index.currency: index_data["currency"]}, synchronize_session=False
            )
        if "create_at" in index_data:
            index_to_be_updated.update(
                {Index.create_at: index_data["create_at"]}, synchronize_session=False
            )

        db.session.commit()
        return True
