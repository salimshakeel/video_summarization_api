import React from 'react';

const ResultPlayer = ({ summaryUrl, setVideo, setSummaryUrl }) => {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '3rem',
      maxWidth: '800px',
      margin: '2rem auto',
      textAlign: 'center'
    }}>
      <h3 style={{
        marginBottom: '2rem',
        fontSize: '1.8rem',
        color: '#00d4ff'
      }}>
        Your summarized video is ready!
      </h3>
      <video 
        src={summaryUrl} 
        controls 
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
      />
      <div style={{ marginTop: '2rem' }}>
        <a 
          href={summaryUrl} 
          download
          style={{
            background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
            border: 'none',
            padding: '0.8rem 2rem',
            borderRadius: '50px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            marginRight: '1rem'
          }}
        >
          Download Summary
        </a>
        <button 
          onClick={() => {
            setVideo(null);
            setSummaryUrl(null);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.8rem 2rem',
            borderRadius: '50px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Process Another Video
        </button>
      </div>
    </div>
  );
};

export default ResultPlayer;
