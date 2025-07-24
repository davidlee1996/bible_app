import React, { useState, useEffect } from "react";
import { addNote, getNotes } from "../api";

export default function NotesPanel({ reference }) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (reference) {
      getNotes(reference).then(setNotes);
    }
  }, [reference]);

  async function handleAdd() {
    const newNote = await addNote(reference, lang, text);
    setNotes([...notes, newNote]);
    setText("");
  }

  if (!reference) return <p>Select a verse to add notes.</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      <h3>Notes for {reference}</h3>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <strong>[{n.language}]</strong> {n.text}
          </li>
        ))}
      </ul>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        rows={3}
        style={{ width: "100%" }}
      />
      <br />
      <select onChange={(e) => setLang(e.target.value)} value={lang}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="ko">Korean</option>
      </select>
      <button onClick={handleAdd} style={{ marginLeft: "0.5rem" }}>
        Add Note
      </button>
    </div>
  );
}
