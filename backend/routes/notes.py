from fastapi import APIRouter, HTTPException
from models import Note

router = APIRouter(prefix="/api/notes", tags=["Notes"])

# In-memory note store (use DB in production)
notes_db = []

@router.get("/")
def get_all_notes():
    return notes_db

@router.get("/{note_id}")
def get_note(note_id: int):
    for note in notes_db:
        if note["id"] == note_id:
            return note
    raise HTTPException(status_code=404, detail="Note not found")

@router.post("/", response_model=Note)
def create_note(note: Note):
    notes_db.append(note.dict())
    return note

@router.delete("/{note_id}")
def delete_note(note_id: int):
    global notes_db
    updated_notes = [note for note in notes_db if note["id"] != note_id]
    if len(updated_notes) == len(notes_db):
        raise HTTPException(status_code=404, detail="Note not found")
    notes_db = updated_notes
    return {"message": "Note deleted"}
