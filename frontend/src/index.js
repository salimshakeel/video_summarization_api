import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // optional if file exists

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("❌ No root element found in index.html");
}
