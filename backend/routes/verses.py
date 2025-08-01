import os
import requests
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api", tags=["Verses"])

API_KEY = os.getenv("BIBLE_API_KEY")
API_BASE = os.getenv("BIBLE_API_BASE", "https://api.scripture.api.bible/v1")

# Sample default Bible ID for English (e.g. NIV)
DEFAULT_BIBLE_ID = "de4e12af7f28f599-01"

@router.get("/external-verse")
def get_external_verse(
    bible_id: str = Query(DEFAULT_BIBLE_ID),
    book: str = Query(...),
    chapter: int = Query(...),
    verse: int = Query(...)
):
    reference = f"{book}.{chapter}.{verse}"
    url = f"{API_BASE}/bibles/{bible_id}/verses/{reference}"

    headers = {
        "api-key": API_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Verse not found or invalid")

    return response.json()
