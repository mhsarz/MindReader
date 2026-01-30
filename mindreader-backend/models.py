# actual blueprint for storing data in the database
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
import uuid



class UserSession (SQLModel, table = True):   # Creating a table for usersession
    id : uuid.UUID = Field(default_factory = uuid.uuid4, primary_key = True) # creating a new unique id for this 
    created_at : datetime = Field(default_factory=datetime.utcnow)
    experiments: list["Experiment"] = Relationship(back_populates="session") # find the variable named 'session' to connect with in Experiment class.

#UserSession is a folder that all the experiments for a specific session goes into

class Experiment(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    bias_type: str
    variant: str
    session_id: uuid.UUID = Field(foreign_key="usersession.id") # link back to parent
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session: UserSession = Relationship(back_populates="experiments") # Allows experiment.session to grab the UserSession object
    responses: list["Response"] = Relationship(back_populates = "experiment")

# The flow -> Session -> Experiment -> Response

class Response (SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    experiment_id: uuid.UUID = Field(foreign_key="experiment.id")
    value: str
    confidence: Optional[int] = None # not mandatory
    reaction_time: Optional[int] = None # not mandatory
    created_at: datetime = Field(default_factory=datetime.utcnow)
    # The missing link needed to complete the chain
    experiment: Experiment = Relationship(back_populates="responses")
