import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-dark" onClick={toggleSidebar}>
        <i className="bi bi-list"></i> 
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="nav flex-column p-3">
        <li className="nav-item">
            <Link className="nav-link text-white" to="/indonesia">Indonesia</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/programming">Programming</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/saved">Saved</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
