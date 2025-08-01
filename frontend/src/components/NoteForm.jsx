import React, { useState } from 'react';
import { createNote } from '../api/api';

function NoteForm({ reference, onNoteAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      verse_reference: reference,
      content,
      language: "en",
    };
    await createNote(newNote);
    setContent("");
    onNoteAdded && onNoteAdded(); // trigger refresh
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
