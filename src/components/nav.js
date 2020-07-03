import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav">
        <h3>Logo</h3>
        <ul className="nav-links">
            <Link to="/" exact>
                <li>Home</li>
            </Link>
            <Link to="/goals">
                <li>Goals</li>
            </Link>
            <Link to="/settings">
                <li>Settings</li>
            </Link>
        </ul>
    </div>
  );
}

export default Nav;
