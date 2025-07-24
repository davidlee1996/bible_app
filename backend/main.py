# backend/main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import httpx, os
from typing import List
from dotenv import load_dotenv

from database import SessionLocal, engine
import models, schemas

# Create tables
models.Base.metadata.create_all(bind=engine)

load_dotenv()
API_KEY = os.getenv("API_BIBLE_KEY")
BASE_URL = "https://api.scripture.api.bible/v1/bibles"

app = FastAPI(title="Bible Translation Dashboard")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Existing endpoints
@app.get("/verse")
async def get_verse(ref: str, bible_id: str):
    headers = {"api-key": API_KEY}
    url = f"{BASE_URL}/{bible_id}/search?query={ref}"
    r = httpx.get(url, headers=headers)
    return r.json()

@app.get("/compare")
async def compare(ref: str, bible_ids: str):
    headers = {"api-key": API_KEY}
    ids = bible_ids.split(",")
    results = {}
    for bid in ids:
        url = f"{BASE_URL}/{bid}/search?query={ref}"
        r = httpx.get(url, headers=headers)
        results[bid] = r.json()
    return results

# New: Notes endpoints
@app.post("/notes", response_model=schemas.NoteOut)
def add_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Note(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@app.get("/notes", response_model=List[schemas.NoteOut])
def list_notes(reference: str = None, db: Session = Depends(get_db)):
    q = db.query(models.Note)
    if reference:
        q = q.filter(models.Note.reference == reference)
    return q.all()
