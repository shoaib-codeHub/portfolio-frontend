import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Decode token function
  const decodeToken = () => {
    const token = localStorage.getItem("token");

    if (token && token.includes(".")) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        // accept username OR email
        if (payload?.username || payload?.email) {
          setUser(payload);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // ✅ Run on mount + listen for changes
useEffect(() => {
  decodeToken();

  const handleAuthChange = () => decodeToken();

  // 🔥 listen custom event
  window.addEventListener("authChange", handleAuthChange);

  // optional: still listen storage (multi-tab support)
  window.addEventListener("storage", handleAuthChange);

  return () => {
    window.removeEventListener("authChange", handleAuthChange);
    window.removeEventListener("storage", handleAuthChange);
  };
}, []);

  // ✅ Logout (FIXED)
const handleLogout = () => {
  localStorage.removeItem("token");

  // 🔥 trigger update
  window.dispatchEvent(new Event("authChange"));

  navigate("/login");
};

  // ✅ Avatar initial
  const getInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  // ✅ Username display
  const getUsername = () => {
    if (user?.username) return user.username;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Logo />

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <div className="user-section" ref={menuRef}>
        {user ? (
          <div className="user-menu">
            {/* 👤 Avatar + Name */}
            <div
              className="user-info"
              onClick={() => setOpen(!open)}
            >
              <div className="avatar">{getInitial()}</div>
              <span className="username">{getUsername()}</span>
            </div>

            {/* 🔽 Dropdown */}
            {open && (
              <div className="dropdown">
                <p className="user-email">
                  {user.email || user.username}
                </p>

                {user.role === "admin" && (
                  <NavLink to="/admin/dashboard">
                    Admin Panel
                  </NavLink>
                )}

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink className="login-btn" to="/login">
            Login / Signup
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;