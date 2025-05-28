import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
      <Sidebar />
      <div className="MainContent">
        <Routes>
        <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      
      </div>
    </Router>
    
  );
}

export default App;
