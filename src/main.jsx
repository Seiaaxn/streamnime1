import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// IMPORT KOMPONEN (Pastikan file App.jsx ada di folder src)
import App from './App'; 
// IMPORT CSS (Hanya gunakan satu jika isinya sama, atau keduanya jika berbeda)
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
