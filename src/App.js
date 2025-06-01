import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Slidebar/Sidebar';
import Home from './pages/Home';
import Task from './pages/Task';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="MainContent">
          <Routes>
            {/* ✅ デフォルトで `/home` にリダイレクト */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/task" element={<Task />} />
            {/* 他のページもここに追加できます */}
            {/* <Route path="/mail" element={<Mail />} /> */}
            {/* <Route path="/analytics" element={<Analytics />} /> */}
            {/* <Route path="/friends" element={<Friends />} /> */}
            {/* <Route path="/payment" element={<Payment />} /> */}
            {/* <Route path="/upload" element={<Upload />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
