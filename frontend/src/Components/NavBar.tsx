import { Link, NavLink } from 'react-router-dom';
import './Styles/NavBar.css';


const NavBar = () => {
  // A placeholder for the user's initials, which you would get from your Redux store.
  const userInitials = "UE";

  return (
    <nav className="navbar">
      {/* App Title/Logo */}
      <Link to="/dashboard" className="navbar-logo">
        Proud Citizen
      </Link>

      {/* Main Navigation Links */}
      <div className="navbar-links">
        <NavLink to="/hubs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Hubs
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Events
        </NavLink>
        <NavLink to="/discussions" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Discussions
        </NavLink>
      </div>

      {/* Profile and Sponsor Section */}
      <div className="navbar-profile-section">
        <Link to="/sponsor" className="sponsor-button">
          Sponsor
        </Link>
        <Link to="/profile-settings" className="profile-link">
            <div className="profile-icon">
                {userInitials}
            </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;