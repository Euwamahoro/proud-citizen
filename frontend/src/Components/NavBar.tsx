import { Link, NavLink } from "react-router-dom";
import "./Styles/NavBar.css";
import type { RootState } from "../Store/index";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";

const NavBar = () => {
  // Get the entire auth state for debugging
  const authState = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Debug logs
  console.log("Full auth state:", authState);
  
  
  if (user) {
    console.log("✅ User found - properties:");
  } else {
    console.log("❌ No user found in Redux state");
  }
  
  // Calculate user initials based on your user data structure
  const getUserInitials = () => {
    console.log("🎯 Getting user initials for user:", user);
    
    if (!user) {
      console.log("❌ No user - returning 'can't find user'");
      return "can't find user";
    }
    
    // If you have firstName and lastName
    if (user.username) {
      const initials = `${user.username.charAt(0)}`
      return initials;
    }
    
    // If you have username
    if (user.username) {
      const initials = user.username.substring(0, 2).toUpperCase();
      console.log("✅ Using username:", initials);
      return initials;
    }
    
    // If you have email as fallback
    if (user.email) {
      const initials = user.email.substring(0, 2).toUpperCase();
      console.log("✅ Using email:", initials);
      return initials;
    }
    
    console.log("❌ No valid property found - returning UE");
    return "UE";
  };

  return (
    <nav className="navbar">
      {/* App Title/Logo */}
      <Link to="/dashboard" className="navbar-logo">
        Proud Citizen
      </Link>

      {/* Main Navigation Links */}
      <div className="navbar-links">
        <NavLink
          to="/hubs"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Hubs
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/discussions"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Discussions
        </NavLink>
      </div>

      {/* Profile and Sponsor Section */}
      <div className="navbar-profile-section">
        <Link to="/sponsor" className="sponsor-button">
          Sponsor
        </Link>
        
        {/* Profile Section */}
        <div className="profile-section">
          {user ? (
            <>
              {console.log("✅ Rendering ProfileDropdown for user:", user)}
              <ProfileDropdown user={user} />
            </>
          ) : (
            <>
              <Link to="/login" className="profile-link">
                <div className="profile-icon">
                  {getUserInitials()}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;