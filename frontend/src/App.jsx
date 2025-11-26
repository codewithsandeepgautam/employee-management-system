// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EmployeeGrid from './pages/EmployeeGrid';
import EmployeeDetail from './pages/EmployeeDetail';
import './styles/App.css';

function App() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <Router>
      <div className="app">
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EmployeeGrid viewMode={viewMode} />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;