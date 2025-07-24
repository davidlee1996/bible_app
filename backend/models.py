# backend/models.py
from sqlalchemy import Column, Integer, String
from database import Base

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    reference = Column(String, index=True)  # e.g. John 3:16
    language = Column(String)               # e.g. en, es, ko
    text = Column(String)                   # your note
