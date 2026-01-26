from sqlmodel import SQLModel, create_engine

DATABASE_URL = "sqlite:///mindreader.db"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

from sqlmodel import Session

def get_session():
    with Session(engine) as session:
        yield session
