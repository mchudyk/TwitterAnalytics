// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css';

function NavBar({ onSearch }) {
  return (
    <nav className="NavBar">
      <div className="left">
        <h1>Twitter Analytics</h1>
      </div>
      <div className="center">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="right">
        <Link to="/">Home</Link>
        <Link to="/create">Create New Post</Link>
      </div>
    </nav>
  );
}

export default NavBar;
