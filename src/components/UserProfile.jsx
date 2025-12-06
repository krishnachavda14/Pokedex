import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <img
          src={user.picture || 'https://via.placeholder.com/40'}
          alt={user.name || 'User'}
          className="user-avatar"
        />
        <div className="user-details">
          <span className="user-name">{user.name || 'User'}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;

