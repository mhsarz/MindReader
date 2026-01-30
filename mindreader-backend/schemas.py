# What data is allowed to come IN and go OUT of the API -> Filtering and validation
from pydantic import BaseModel
import uuid
from typing import Optional

class ExperimentStart (BaseModel) :
    bias_type : str # which experiment is starting
    session_id: Optional[uuid.UUID] = None # which user -> Not mandatory cuz maybe is a new user

class ExperimentRead (BaseModel) : # thing we send back from backedn to front after start of experiment
    id : uuid.UUID # experiment
    session_id : uuid.UUID
    variant : str # low_anchor, high_anchor


class ResponseCreate ()
