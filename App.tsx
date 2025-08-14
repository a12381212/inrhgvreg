
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnswerSheetPage from './pages/AnswerSheetPage';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-[sans-serif] text-gray-800">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/answersheet" element={<AnswerSheetPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
