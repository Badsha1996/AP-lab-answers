import React, { useState } from 'react';
import { FiPlay, FiSearch } from 'react-icons/fi';
import './Header.css';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <FiPlay className="logo-icon" />
          <span className="logo-text">MiniTube</span>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={handleChange}
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
