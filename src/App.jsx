import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Programming from './pages/Programming';
import Indonesia from './pages/Indonesia';
import Saved from './pages/Saved';
import Search from './pages/Search';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Indonesia />} />
            <Route path="/programming" element={<Programming />} />
            <Route path="/indonesia" element={<Indonesia />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
