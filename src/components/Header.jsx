import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value.trim();
    if (keyword) {
      navigate(`/search?q=${keyword}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <form className="d-flex mx-auto" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            name="search"
            placeholder="Search news..."
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
