from api.Models.index_model import Index
from api.engine import session


@staticmethod
def get_index_list():
    query = session.query(Index).all()
    return query


@staticmethod
def get_index_by_id(id):
    query = session.query(Index).filter(Index.id == id).first()
    return query


@staticmethod
def add_index(index_data):
    index_to_be_added = Index(
        name=index_data["name"],
        icon=index_data["icon"],
        currency=index_data["currency"],
        create_at=index_data["create_at"],
    )
    session.add(index_to_be_added)
    session.commit()
    return True


@staticmethod
def delete_index(index_data):
    index_to_be_deleted = session.query(Index).filter(Index.name == index_data["name"])
    session.delete(index_to_be_deleted)
    session.commit()
    return True

@staticmethod
def update_index(index_data):
    index_to_be_updated = session.query(Index).filter(Index.name ==index_data['name']).update({Index:index_data['name']})
   
    
