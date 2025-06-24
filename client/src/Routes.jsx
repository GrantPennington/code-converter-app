// client/src/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SummarizerPage from './pages/SummarizerPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import NoteHistoryPage from './pages/NoteHistoryPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<NoteHistoryPage />} />
        {/* Add more routes here as needed */}
      </Routes>
  );
};

export default AppRoutes;