import React, { useState } from "react";
import CompareViewer from "./components/CompareViewer";
import NotesPanel from "./components/NotesPanel";

function App() {
  const [selectedRef, setSelectedRef] = useState("John 3:16");

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Bible Translation Dashboard</h1>
      <CompareViewer />
      <NotesPanel reference={selectedRef} />
    </div>
  );
}

export default App;
