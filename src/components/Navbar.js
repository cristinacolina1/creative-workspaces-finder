import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-review">Add Review</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin Page</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
