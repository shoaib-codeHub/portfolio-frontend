import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Decode token
  const decodeToken = () => {
    const token = localStorage.getItem("token");

    if (token && token.includes(".")) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

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

  // ✅ Listen auth change
  useEffect(() => {
    decodeToken();

    const handleAuthChange = () => decodeToken();

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  // ✅ Avatar initial
  const getInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  // ✅ Username
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

      {/* 🍔 Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* 🔗 LINKS (includes login/signup in mobile) */}
      <div className={`links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

        {/* 👇 show login inside menu (mobile UX) */}
        {!user && (
          <NavLink
            className="login-btn"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login / Signup
          </NavLink>
        )}

        {/* 👇 if logged in, show logout in menu */}
        {user && (
          <button
            className="logout-btn"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* 👤 USER (only desktop) */}
      {user && (
        <div className="user-section" ref={menuRef}>
          <div
            className="user-info"
            onClick={() => setOpen(!open)}
          >
            <div className="avatar">{getInitial()}</div>
            <span className="username">{getUsername()}</span>
          </div>

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
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
