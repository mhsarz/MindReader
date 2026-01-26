from fastapi import FastAPI
from database import create_db_and_tables
from models import Experiment

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
