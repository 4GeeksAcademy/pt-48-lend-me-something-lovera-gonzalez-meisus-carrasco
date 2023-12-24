from sqlalchemy import create_engine
from api.models import db
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql+psycopg2://postgres:1725@localhost:5432/postgres")
db.Model.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()
