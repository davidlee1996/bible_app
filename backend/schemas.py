# backend/schemas.py
from pydantic import BaseModel

class NoteCreate(BaseModel):
    reference: str
    language: str
    text: str

class NoteOut(NoteCreate):
    id: int
    class Config:
        orm_mode = True
