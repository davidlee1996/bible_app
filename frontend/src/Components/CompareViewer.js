import React, { useState } from "react";
import { fetchCompare } from "../api";

export default function CompareViewer() {
  const [ref, setRef] = useState("");
  const [results, setResults] = useState({});

  async function handleCompare() {
    const data = await fetchCompare(ref, [
      "de4e12af7f28f599-02", // KJV English
      "592420522e16049f-01", // Spanish Reina-Valera
      "8f06fbf1d63fb251-01"  // Korean Revised
    ]);
    setResults(data);
  }

  return (
    <div>
      <h2>Compare Translations (Languages)</h2>
      <input placeholder="John 3:16" onChange={e => setRef(e.target.value)} />
      <button onClick={handleCompare}>Compare</button>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        {Object.entries(results).map(([lang, data]) => (
          <div key={lang} style={{ border: "1px solid #ccc", padding: "0.5rem", width: "30%" }}>
            <h3>{lang}</h3>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
