
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






// // src/App.js
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [summaryUrl, setSummaryUrl] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [currentTip, setCurrentTip] = useState('');
//   const [isDragging, setIsDragging] = useState(false);

//   const tips = [
//     "Did you know AI can summarize a full lecture in seconds?",
//     "Our neural networks are crunching your video...",
//     "Let AI do the heavy lifting!",
//     "Processing your video with deep learning magic...",
//     "Analyzing frames and extracting key moments..."
//   ];

//   useEffect(() => {
//     if (loading) {
//       const tipInterval = setInterval(() => {
//         setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
//       }, 4000);
//       return () => clearInterval(tipInterval);
//     }
//   }, [loading]);

//   const handleFileChange = (e) => {
//     setVideo(e.target.files[0]);
//     setSummaryUrl(null);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files[0]) {
//       setVideo(e.dataTransfer.files[0]);
//       setSummaryUrl(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!video) return;

//     const formData = new FormData();
//     formData.append("video", video);

//     setLoading(true);
//     setProgress(0);

//     try {
//       const response = await fetch("http://localhost:8000/summarize", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       const fullUrl = `http://localhost:8000${data.summary_video_url}`;
//       setSummaryUrl(fullUrl);
//     } catch (err) {
//       alert("Error: " + err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setProgress(0);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
//       color: 'white',
//       position: 'relative',
//       overflow: 'hidden',
//       padding: '2rem'
//     }}>
//       {/* Animated background elements */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(100, 100, 255, 0.1) 0%, transparent 50%)',
//         zIndex: 0
//       }}></div>

//       {/* Floating particles */}
//       {[...Array(20)].map((_, i) => (
//         <div key={i} style={{
//           position: 'absolute',
//           width: '2px',
//           height: '2px',
//           borderRadius: '50%',
//           background: 'rgba(100, 200, 255, 0.8)',
//           top: `${Math.random() * 100}%`,
//           left: `${Math.random() * 100}%`,
//           animation: `float ${5 + Math.random() * 10}s linear infinite`,
//           zIndex: 0
//         }}></div>
//       ))}

//       <div style={{
//         position: 'relative',
//         zIndex: 1,
//         maxWidth: '1200px',
//         margin: '0 auto',
//         textAlign: 'center'
//       }}>
//         <h1 style={{
//           fontSize: '3.5rem',
//           fontWeight: '800',
//           marginBottom: '2rem',
//           background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           textShadow: '0 0 10px rgba(100, 200, 255, 0.3)'
//         }}>
//           AI Video Summarization
//         </h1>
//         <p style={{
//           fontSize: '1.2rem',
//           marginBottom: '3rem',
//           opacity: 0.8
//         }}>
//           Using Deep Learning Techniques
//         </p>

//         {!loading && !summaryUrl && (
//           <div 
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             onClick={() => document.getElementById('fileInput').click()}
//             style={{
//               border: `2px dashed ${isDragging ? '#7e5bef' : 'rgba(255, 255, 255, 0.2)'}`,
//               borderRadius: '20px',
//               padding: '3rem 2rem',
//               background: 'rgba(0, 0, 0, 0.2)',
//               backdropFilter: 'blur(10px)',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               boxShadow: isDragging ? '0 0 20px rgba(126, 91, 239, 0.5)' : '0 0 20px rgba(0, 0, 0, 0.2)',
//               margin: '0 auto',
//               maxWidth: '600px',
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//           >
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: '3px',
//               background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
//               width: `${progress}%`,
//               transition: 'width 0.3s ease'
//             }}></div>
//             <div style={{
//               fontSize: '5rem',
//               marginBottom: '1rem',
//               color: 'rgba(100, 200, 255, 0.5)'
//             }}>
//               <i className="fas fa-video"></i>
//             </div>
//             <h3 style={{
//               marginBottom: '1rem',
//               fontSize: '1.5rem'
//             }}>
//               {isDragging ? 'Drop your video here' : 'Upload your video to summarize'}
//             </h3>
//             <p style={{
//               opacity: 0.7,
//               marginBottom: '1.5rem'
//             }}>
//               Drag & drop or click to browse files
//             </p>
//             <input 
//               id="fileInput"
//               type="file" 
//               accept="video/*" 
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />
//             {video && (
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleUpload();
//                 }}
//                 style={{
//                   background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
//                   border: 'none',
//                   padding: '0.8rem 2rem',
//                   borderRadius: '50px',
//                   color: 'white',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
//                   marginTop: '1rem'
//                 }}
//               >
//                 Process Video
//               </button>
//             )}
//           </div>
//         )}

//         {loading && (
//           <div style={{
//             background: 'rgba(0, 0, 0, 0.2)',
//             backdropFilter: 'blur(10px)',
//             borderRadius: '20px',
//             padding: '3rem',
//             maxWidth: '600px',
//             margin: '0 auto',
//             textAlign: 'center'
//           }}>
//             <div style={{
//               position: 'relative',
//               width: '150px',
//               height: '150px',
//               margin: '0 auto 2rem'
//             }}>
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '100%',
//                 height: '100%',
//                 border: '3px solid rgba(100, 200, 255, 0.2)',
//                 borderRadius: '50%',
//                 animation: 'pulse 2s infinite'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '80%',
//                 height: '80%',
//                 border: '3px solid rgba(100, 200, 255, 0.4)',
//                 borderRadius: '50%',
//                 animation: 'pulse 2s infinite 0.5s'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '60%',
//                 height: '60%',
//                 border: '3px solid rgba(100, 200, 255, 0.6)',
//                 borderRadius: '50%',
//                 animation: 'pulse 2s infinite 1s'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 fontSize: '3rem',
//                 color: '#00d4ff'
//               }}>
//                 <i className="fas fa-brain"></i>
//               </div>
//             </div>
//             <h3 style={{
//               marginBottom: '1rem',
//               fontSize: '1.5rem'
//             }}>
//               Analyzing your video...
//             </h3>
//             <p style={{
//               opacity: 0.8,
//               fontStyle: 'italic',
//               minHeight: '50px'
//             }}>
//               {currentTip}
//             </p>
//             <div style={{
//               width: '100%',
//               height: '6px',
//               background: 'rgba(255, 255, 255, 0.1)',
//               borderRadius: '3px',
//               marginTop: '2rem',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${progress}%`,
//                 height: '100%',
//                 background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         )}

//         {summaryUrl && (
//           <div style={{
//             background: 'rgba(0, 0, 0, 0.2)',
//             backdropFilter: 'blur(10px)',
//             borderRadius: '20px',
//             padding: '3rem',
//             maxWidth: '800px',
//             margin: '0 auto',
//             textAlign: 'center'
//           }}>
//             <h3 style={{
//               marginBottom: '2rem',
//               fontSize: '1.8rem',
//               color: '#00d4ff'
//             }}>
//               Your summarized video is ready!
//             </h3>
//             <video 
//               src={summaryUrl} 
//               controls 
//               style={{
//                 width: '100%',
//                 maxWidth: '600px',
//                 borderRadius: '10px',
//                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
//               }}
//             />
//             <div style={{ marginTop: '2rem' }}>
//               <a 
//                 href={summaryUrl} 
//                 download
//                 style={{
//                   background: 'linear-gradient(90deg, #00d4ff, #7e5bef)',
//                   border: 'none',
//                   padding: '0.8rem 2rem',
//                   borderRadius: '50px',
//                   color: 'white',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
//                   textDecoration: 'none',
//                   display: 'inline-block'
//                 }}
//               >
//                 Download Summary
//               </a>
//               <button 
//                 onClick={() => {
//                   setVideo(null);
//                   setSummaryUrl(null);
//                 }}
//                 style={{
//                   background: 'rgba(255, 255, 255, 0.1)',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   padding: '0.8rem 2rem',
//                   borderRadius: '50px',
//                   color: 'white',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   marginLeft: '1rem'
//                 }}
//               >
//                 Process Another Video
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add Font Awesome for icons */}
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
//     </div>
//   );
// }

// export default App;