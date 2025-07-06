// src/App.js
import React, { useState } from 'react';

function App() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryUrl, setSummaryUrl] = useState(null);

  // ✅ You forgot this function
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
    setSummaryUrl(null);
  };

  const handleUpload = async () => {
    if (!video) return;

    const formData = new FormData();
    formData.append("video", video); // must match FastAPI parameter name

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const fullUrl = `http://localhost:8000${data.summary_video_url}`;
      setSummaryUrl(fullUrl);
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>🎬 Video Summarization</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={!video || loading} style={{ marginTop: 10 }}>
        {loading ? "Summarizing..." : "Upload & Summarize"}
      </button>

      {summaryUrl && (
        <div style={{ marginTop: 20 }}>
          <h4>📥 Summarized Video:</h4>
          <video src={summaryUrl} controls width="480" />
          <br />
          <a href={summaryUrl} download style={{ marginTop: 10, display: 'inline-block' }}>
            ⬇️ Download Summary
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
