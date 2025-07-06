// src/UploadForm.js
import React, { useState } from 'react';
import { uploadVideo } from './api';

const UploadForm = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a video file first.");
    setLoading(true);
    try {
      const result = await uploadVideo(file);
      onResult(result.video_url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to process video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input type="file" accept="video/mp4" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Summarize Video"}
      </button>
    </div>
  );
};

export default UploadForm;
