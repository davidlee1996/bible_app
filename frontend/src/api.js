const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function fetchVerse(book, chapter, verse) {
  const res = await fetch(`${BASE_URL}/verse?book=${book}&chapter=${chapter}&verse=${verse}`);
  return res.json();
}

export async function fetchExternalVerse(bible_id, book, chapter, verse) {
  const res = await fetch(`${BASE_URL}/external-verse?bible_id=${bible_id}&book=${book}&chapter=${chapter}&verse=${verse}`);
  return res.json();
}

export async function fetchNotes(reference) {
  const res = await fetch(`${BASE_URL}/notes?reference=${encodeURIComponent(reference)}`);
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(noteId) {
  const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
  });
  return res.json();
}
