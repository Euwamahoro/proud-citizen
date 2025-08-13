import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';
import type { User } from '../Store/authSlice';

interface ProfileDropdownProps {
  user: User;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get user initials
  const getUserInitials = () => {
    // If you have firstName and lastName
    if (user.username) {
      return `${user.username.charAt(0)}${user.username.charAt(0)}`;
    }
    
    // If you have username (more likely based on your backend)
    if (user.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    
    // If you have email as fallback
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return "UE";
  };

  // Get display name
  const getDisplayName = () => {
    if (user.username && user.username) {
      return `${user.username} ${user.username}`;
    }
    
    if (user.username) {
      return user.username;
    }
    
    return user.email;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="profile-avatar">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="profile-image" />
          ) : (
            <span className="profile-initials">{getUserInitials()}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-name">{getDisplayName()}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-items">
            <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
              <span>Profile</span>
            </Link>
            <Link to="/profile-settings" className="dropdown-item" onClick={() => setIsOpen(false)}>
              <span>Settings</span>
            </Link>
            <button className="dropdown-item logout-item" onClick={handleLogout}>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;