import { useEffect, useState } from 'react';
import './App.css';
import SummarizerPage from './pages/SummarizerPage';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import MainLayout from './layout/MainLayout';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  // warm up backend for better user experience
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/ping`)
      .then(() => setIsBackendReady(true))
      .catch(() => setIsBackendReady(true)); // still proceed even if it fails
  }, []);

  // handle sessionId on page load
  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId);
    }
  }, []);

  return (
    <Router>
      <MainLayout>
        <AppRoutes />
        <LoadingOverlay 
          open={!isBackendReady} 
          message={"Warming up backend 🔥"}
          secondaryMessage={"Please wait one moment..."}
        />
      </MainLayout>
    </Router>
  );
}

export default App;
