from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from database import create_db_and_tables, get_session
from models import Experiment, UserSession, Response
from schemas import ExperimentRead, ExperimentStart, ResponseCreate
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, cast, Float, select
import random

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",  
    "*"                       
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,  
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup(): # experiment start
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
    elif experiment_data.bias_type == "framing":
        game_variant = random.choice(["positive_framing", "negative_framing"])
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
def submit_response(response: ResponseCreate, db: Session = Depends(get_session)):
    
    # 1. Look up the specific experiment this response belongs to
    experiment = db.get(Experiment, response.experiment_id)
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")

    # 2. The Smart Bouncer: Apply rules based on the bias_type
    if experiment.bias_type == "anchoring":
        try:
            float(response.value) # Must be a number
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid answer. Please provide a valid number and try again.")
            
    elif experiment.bias_type == "framing":
        pass # complete later with more experiments

    new_response = Response( 
        experiment_id=response.experiment_id,
        value=response.value,
        confidence=response.confidence,
        reaction_time=response.reaction_time
    )
    db.add(new_response)
    db.commit()
    db.refresh(new_response)

    return new_response

@app.get("/api/stats/{bias_type}")
def get_stats(bias_type: str, db: Session = Depends(get_session)):
    
    # If the frontend asks for anchoring stats:
    if bias_type == "anchoring":
        avg_high = db.query(func.avg(cast(Response.value, Float))).join(Experiment).filter(
            Experiment.bias_type == "anchoring", 
            Experiment.variant == "high_anchor"
        ).scalar()
        
        avg_low = db.query(func.avg(cast(Response.value, Float))).join(Experiment).filter(
            Experiment.bias_type == "anchoring", 
            Experiment.variant == "low_anchor"
        ).scalar()
        
        return {
            "high_anchor": avg_high or 0,
            "low_anchor": avg_low or 0
        }
    
    # If the frontend asks for framing stats:
    elif bias_type == "framing":
        positive_safe = db.query(func.count(Response.id)).join(Experiment).filter(
                Experiment.bias_type == "framing",           # 1. Must be the framing game
                Experiment.variant == "positive_framing",    # 2. Must be the positive universe
                Response.value == "safe_choice"              # 3. Must have picked the safe option!
                ).scalar()
        positive_risky = db.query(func.count(Response.id)).join(Experiment).filter(
                Experiment.bias_type == "framing",           
                Experiment.variant == "positive_framing",    
                Response.value == "risky_choice"             
                ).scalar()
        negative_safe = db.query(func.count(Response.id)).join(Experiment).filter(
                Experiment.bias_type == "framing",           
                Experiment.variant == "negative_framing",    
                Response.value == "safe_choice"              
                ).scalar()
        negative_risky = db.query(func.count(Response.id)).join(Experiment).filter(
                Experiment.bias_type == "framing",         
                Experiment.variant == "negative_framing",    
                Response.value == "risky_choice"             
                ).scalar()
        
        return {
            "positive_frame": {
                "safe_choices": positive_safe or 0,
                "risky_choices": positive_risky or 0
            },
            "negative_frame": {
                "safe_choices": negative_safe or 0,
                "risky_choices": negative_risky or 0
            }
        }

    # Fallback
    raise HTTPException(status_code=404, detail="Bias type not found")
