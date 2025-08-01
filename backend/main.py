from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import verses, notes

app = FastAPI()

# === CORS CONFIG ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or use ["*"] during local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Bible API is running."}

# Register routers
app.include_router(verses.router)
app.include_router(notes.router)
