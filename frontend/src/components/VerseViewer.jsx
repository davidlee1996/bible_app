import React, { useEffect, useState } from 'react';
import { fetchVerse } from '../api/api';

function VerseViewer({ book, chapter, verse }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchVerse(book, chapter, verse).then(setData);
  }, [book, chapter, verse]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book} {chapter}:{verse}</h2>
      <p>{data.text}</p>
    </div>
  );
}

export default VerseViewer;
