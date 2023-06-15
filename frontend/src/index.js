import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeProvider } from './components/Darkmode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DarkModeProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </DarkModeProvider>
);

