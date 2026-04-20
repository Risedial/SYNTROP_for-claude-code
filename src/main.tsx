import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { resolveDeviceId } from './lib/deviceId';
import { useStore } from './store/useStore';
import { QUESTION_IDS } from './data/questions';
import App from './App';

// Initialize device identity and question records before first render
const deviceId = resolveDeviceId();
useStore.getState().setDeviceId(deviceId);
useStore.getState().initializeQuestions(QUESTION_IDS);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
