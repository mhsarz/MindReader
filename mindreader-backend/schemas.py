# What data is allowed to come IN and go OUT of the API
from pydantic import BaseModel

class ExperimentCreate(BaseModel) : # used when the client sends data to create a new experiment.
    bias_type : str # anchor, framing, ...
    variant : str # e.g low_anchor high_anchor
    response_data : dict # anchor value, user estimation

class ExperimentResponse (BaseModel): # used when the server sends data back to the client.
    experiment_id : int


# After POST -> accept JSON, convert to create, check types, return matched response
