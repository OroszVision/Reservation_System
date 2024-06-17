import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainMenu.css';

const MainMenu = () => {
  const role = localStorage.getItem('role');

  return (
    <nav className="main-menu">
      <ul>
        {role === 'ADMIN' ? (
          <>
            <li><Link to="/new-additional" className="menu-link">New Additional</Link></li>
            <li><Link to="/list-additionals" className="menu-link">List Additionals</Link></li>
            <li><Link to="/new-reservation" className="menu-link">New Reservation</Link></li>
            <li><Link to="/list-reservations" className="menu-link">List Reservations</Link></li>
            <li><Link to="/list-users-reservations" className="menu-link">List User's Reservations</Link></li>
            <li><Link to="/manage-user-permissions" className="menu-link">Manage User Permissions</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/new-reservation" className="menu-link">New Reservation</Link></li>
            <li><Link to="/list-reservations" className="menu-link">List Reservations</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MainMenu;
