import React from 'react';

const UploadForm = ({
  video,
  loading,
  summaryUrl,
  handleFileChange,
  handleUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  isDragging,
  progress,
  currentTip
}) => {
  return (
    <>
      {!loading && !summaryUrl && (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
          style={{
            border: `2px dashed ${isDragging ? '#7e5bef' : 'rgba(255, 255, 255, 0.2)'}`,
            borderRadius: '20px',
            padding: '3rem 2rem',
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isDragging ? '0 0 20px rgba(126, 91, 239, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.2)',
            margin: '0 auto',
            maxWidth: '600px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
            width: `${progress}%`,
            transition: 'width 0.3s ease'
          }}></div>

          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem',
            color: 'rgba(100, 200, 255, 0.5)'
          }}>
            <i className="fas fa-video"></i>
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            {isDragging ? 'Drop your video here' : 'Upload your video to summarize'}
          </h3>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
            Drag & drop or click to browse files
          </p>
          <input 
            id="fileInput"
            type="file" 
            accept="video/*" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {video && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleUpload();
              }}
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                marginTop: '1rem'
              }}
            >
              Process Video
            </button>
          )}
        </div>
      )}

      {loading && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            margin: '0 auto 2rem'
          }}>
            {[0, 0.5, 1].map((delay, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${100 - i * 20}%`,
                height: `${100 - i * 20}%`,
                border: `3px solid rgba(100, 200, 255, ${0.2 + i * 0.2})`,
                borderRadius: '50%',
                animation: `pulse 2s infinite ${delay}s`
              }}></div>
            ))}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '3rem',
              color: '#00d4ff'
            }}>
              <i className="fas fa-brain"></i>
            </div>
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            Analyzing your video...
          </h3>
          <p style={{ opacity: 0.8, fontStyle: 'italic', minHeight: '50px' }}>
            {currentTip}
          </p>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            marginTop: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadForm;
