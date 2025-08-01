import React from 'react';
import VerseViewer from '../components/VerseViewer';
import NotesPanel from '../components/NotesPanel';
import NoteForm from '../components/NoteForm';

function VersePage() {
  const book = "John";
  const chapter = 3;
  const verse = 16;
  const reference = `${book} ${chapter}:${verse}`;

  const [refresh, setRefresh] = React.useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <VerseViewer book={book} chapter={chapter} verse={verse} />
      <NoteForm reference={reference} onNoteAdded={triggerRefresh} />
      <NotesPanel reference={reference} key={refresh} />
    </div>
  );
}

export default VersePage;
