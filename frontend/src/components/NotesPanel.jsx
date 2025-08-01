import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api/api';

function NotesPanel({ reference }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes(reference).then((data) => {
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.warn("Unexpected notes format:", data);
        setNotes([]);
      }
    });
  }, [reference]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h3>Notes for {reference}</h3>
      {notes.length === 0 ? <p>No notes yet.</p> : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.content} ({note.language})
              <button onClick={() => handleDelete(note.id)}>🗑</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesPanel;
