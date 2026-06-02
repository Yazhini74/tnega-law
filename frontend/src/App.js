import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import HomePage from './pages/HomePage';
import ApplicationFormStepper from './pages/ApplicationFormStepper';
import ViewApplicationPage from './pages/ViewApplicationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-application" element={<ApplicationFormStepper />} />
          <Route path="/view-application/:id" element={<ViewApplicationPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
