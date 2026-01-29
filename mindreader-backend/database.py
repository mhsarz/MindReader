from sqlmodel import SQLModel, create_engine

DATABASE_URL = "sqlite:///mindreader.db" # the database file

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine) # reads all models with table=True and creates the corresponding tables.

from sqlmodel import Session # connection manager

def get_session():
    with Session(engine) as session: # opens a session
        yield session

#CRUD as:

#Create → add new experiments

#Read → get experiments from the database

#Update → change existing experiments

#Delete → remove experiments

def create_experiment (session: Session, experiment: Experiment): # adds a new experiment to the database
    session.add(experiment)
    session.commit() # database actually saves
    session.refresh(experiment) # get id - updates your object with new avlues like id and time
    return experiment

def get_experiments (session: Session): # retrieves all experiments
    return session.query(Experiment).all()
