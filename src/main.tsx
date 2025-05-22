import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.js';
import 'normalize.css';
import './styles/main.scss';


createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
