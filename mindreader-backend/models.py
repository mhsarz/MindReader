from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class Experiment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bias_type: str
    variant: str
    response_data: str
    result_metrics: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)