import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isAdmin
        ? `${BASE_URL}/admin/login`
        : `${BASE_URL}/user/login`;

      const body = isAdmin
        ? {
            username: loginData.email, // using same field
            password: loginData.password,
          }
        : loginData;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        // 🔥 IMPORTANT: update Navbar instantly
        window.dispatchEvent(new Event("authChange"));

        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created! Please login.");
        setIsFlipped(false);

        // reset form
        setSignupData({ email: "", password: "" });
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>

        {/* ================= LOGIN ================= */}
        <div className="auth-front">
          <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>

          {/* 🔥 TOGGLE */}
          <div className="auth-toggle">
            <button
              className={!isAdmin ? "active" : ""}
              onClick={() => setIsAdmin(false)}
            >
              User
            </button>
            <button
              className={isAdmin ? "active" : ""}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder={isAdmin ? "Username" : "Email"}
              value={loginData.email}
              required
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              required
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button type="submit">Login</button>
          </form>

          {message && <p className="auth-message">{message}</p>}

          {!isAdmin && (
            <p>
              New user?{" "}
              <span onClick={() => setIsFlipped(true)}>
                Create account
              </span>
            </p>
          )}
        </div>

        {/* ================= SIGNUP ================= */}
        <div className="auth-back">
          <h2>Sign Up</h2>

          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              required
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              required
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />

            <button type="submit">Create Account</button>
          </form>

          {message && <p className="auth-message">{message}</p>}

          <p>
            Already have an account?{" "}
            <span onClick={() => setIsFlipped(false)}>
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;