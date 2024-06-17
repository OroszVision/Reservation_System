import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ReservationsList from './components/ReservationsList';
import AdditionalsList from './components/AdditionalList';
import useAuth from './hooks/useAuth';
import MainMenu from './components/MainMenu';
import './App.css';
import AdditionalEdit from './components/AdditionalEdit';
import AdditionalForm from './components/AdditionalForm';
import ReservationForm from './components/ReservationForm';
import ReservationUsersList from './components/ReservationUsersList';
import UserPermission from './components/UserPermission';
import { NotificationProvider } from './components/NotificationContext'; // Import NotificationProvider
import Notification from './components/Notification'; // Import Notification component

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <NotificationProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <div className="left-section">
                <Link to="/list-reservations" className="logo">Reservation System</Link>
              </div>
              <div className="menu-section">
                {isAuthenticated && <MainMenu />}
              </div>
              <div className="right-section">
                {isAuthenticated ? (
                  <button onClick={logout} className="logout-button">Odhlásit se</button>
                ) : (
                  <div className="auth-links">
                    <Link to="/login" className="auth-link">Přihlásit se</Link>
                    <Link to="/register" className="auth-link">Registrovat se</Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="content">
            <Routes>
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/list-reservations" element={isAuthenticated ? <ReservationsList /> : <Navigate to="/login" />} />
              <Route path="/new-reservation" element={isAuthenticated ? <ReservationForm /> : <Navigate to="/login" />} />
              <Route path="/reservation/:id" element={isAuthenticated ? <ReservationForm /> : <Navigate to="/login" />} />
              <Route path="/list-users-reservations" element={isAuthenticated ? <ReservationUsersList /> : <Navigate to="/login" />} />
              <Route path="/edit-additional/:id" element={isAuthenticated ? <AdditionalEdit /> : <Navigate to="/login" />} />
              <Route path="/list-additionals" element={isAuthenticated ? <AdditionalsList /> : <Navigate to="/login" />} />
              <Route path="/new-additional" element={isAuthenticated ? <AdditionalForm /> : <Navigate to="/login" />} />
              <Route path="/manage-user-permissions" element={isAuthenticated ? <UserPermission /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          <Notification /> {/* Render Notification component */}
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
