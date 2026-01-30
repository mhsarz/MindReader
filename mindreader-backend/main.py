from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from database import create_db_and_tables, get_session
from models import Experiment, UserSession, Response
from schemas import ExperimentRead, ExperimentStart, ResponseCreate
import random
import uuid

app = FastAPI()

@app.on_event("startup")
def on_startup(): # experiment start
    # What goes here?
    create_db_and_tables()


@app.post("/api/experiments", response_model=ExperimentRead)
def start_experiment(experiment_data: ExperimentStart, db: Session = Depends(get_session)):
    # Logic comes next...
    game_variant = "control"
    if experiment_data.session_id is None: # create a new user
        new_user = UserSession()
        db.add (new_user) # adding to db
        db.commit()
        db.refresh(new_user) # new id assigned
        experiment_data.session_id = new_user.id
    if experiment_data.bias_type == "anchoring":
        # Randomly pick one of the two "universes"
        game_variant = random.choice(["low_anchor", "high_anchor"])

    # 3. Create the experiment with that variant
    new_experiment = Experiment(
        session_id = experiment_data.session_id, # using the ID we handled earlier
        bias_type = experiment_data.bias_type,
        variant = game_variant 
    )

    db.add(new_experiment) # adding to db
    db.commit()
    db.refresh(new_experiment)

    return new_experiment

@app.post("/api/responses", response_model=Response)
def submit_response (response : ResponseCreate , db: Session = Depends(get_session)) :
    new_response = Response (
        experiment_id=response.experiment_id,
        value = response.value,
        confidence=response.confidence,
        reaction_time=response.reaction_time
    )
    db.add(new_response)
    db.commit()
    db.refresh(new_response)

    return new_response


