import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConversionHistoryPage from './pages/ConversionHistoryPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<ConversionHistoryPage />} />
      </Routes>
  );
};

export default AppRoutes;