const API_BASE = "http://localhost:8000";

export async function fetchVerse(ref, bibleId) {
  const res = await fetch(`${API_BASE}/verse?ref=${encodeURIComponent(ref)}&bible_id=${bibleId}`);
  return res.json();
}

export async function fetchCompare(ref, bibleIds) {
  const res = await fetch(`${API_BASE}/compare?ref=${encodeURIComponent(ref)}&bible_ids=${bibleIds.join(",")}`);
  return res.json();
}

export async function addNote(reference, language, text) {
  const res = await fetch("http://localhost:8000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference, language, text })
  });
  return res.json();
}

export async function getNotes(reference) {
  const url = reference
    ? `http://localhost:8000/notes?reference=${encodeURIComponent(reference)}`
    : `http://localhost:8000/notes`;
  const res = await fetch(url);
  return res.json();
}
