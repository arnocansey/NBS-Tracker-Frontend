// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main application component
import './styles/index.css'; // Import the main CSS/styling file (kept as original)

// 1. Locate the root element in index.html (the div with id="root")
const rootElement = document.getElementById('root');

if (rootElement) {
    // 2. Create a React root instance
    ReactDOM.createRoot(rootElement).render(
        // 3. Render the application components
        <React.StrictMode>
            <App /> 
        </React.StrictMode>,
    );
} else {
    // Safety check
    console.error('Root element with ID "root" not found in the document.');
}
