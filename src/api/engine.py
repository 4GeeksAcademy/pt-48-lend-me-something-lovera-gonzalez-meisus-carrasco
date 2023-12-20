from sqlalchemy import create_engine
from models import db
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://gitpod:postgres@localhost:5432/example", echo=True)
db.Model.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
