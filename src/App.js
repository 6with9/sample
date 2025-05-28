import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Slidebar/Sidebar';
import Home from './pages/Home';

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
        </Routes>
      </div>
      
      </div>
    </Router>
    
  );
}

export default App;
