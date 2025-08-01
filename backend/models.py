# backend/models.py
from pydantic import BaseModel
from typing import List

class Note(BaseModel):
    id: int
    verse_reference: str  # e.g. "John 3:16"
    content: str
    language: str = "en"

class Verse(BaseModel):
    book: str
    chapter: int
    verse: int
    text: str

class SearchQuery(BaseModel):
    keyword: str
