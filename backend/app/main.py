from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .db import Base, engine, SessionLocal
from .models import Report

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkyWatch Africa API", version="0.1.0")

# Allow local frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for MVP; lock down later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReportCreate(BaseModel):
    event_type: str = Field(..., examples=["meteor", "satellite", "flash", "unknown"])
    description: Optional[str] = Field(None, max_length=500)
    latitude: float
    longitude: float
    observed_at: datetime = Field(default_factory=lambda: datetime.utcnow())

class ReportOut(BaseModel):
    id: int
    event_type: str
    description: Optional[str]
    latitude: float
    longitude: float
    observed_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/reports", response_model=ReportOut)
def create_report(payload: ReportCreate):
    db = SessionLocal()
    try:
        report = Report(
            event_type=payload.event_type.strip().lower(),
            description=(payload.description or "").strip() or None,
            latitude=payload.latitude,
            longitude=payload.longitude,
            observed_at=payload.observed_at,
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        return report
    finally:
        db.close()

@app.get("/reports", response_model=List[ReportOut])
def list_reports(limit: int = 100):
    if limit < 1 or limit > 1000:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 1000")
    db = SessionLocal()
    try:
        rows = db.query(Report).order_by(Report.observed_at.desc()).limit(limit).all()
        return rows
    finally:
        db.close()
