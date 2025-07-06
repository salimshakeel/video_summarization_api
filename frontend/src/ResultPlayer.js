// src/ResultPlayer.js
import React from 'react';

const ResultPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <div>
      <h3>Summarized Video:</h3>
      <video controls width="600" src={videoUrl}></video>
    </div>
  );
};

export default ResultPlayer;
