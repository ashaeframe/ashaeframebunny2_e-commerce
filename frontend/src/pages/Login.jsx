import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/apiClient";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await authAPI.login(email, password);

      if (response.error) {
        setError(response.error);
      } else {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name || !email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const response = await authAPI.register(name, email, password);

      if (response.error) {
        setError(response.error);
      } else {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isSignUp ? handleSignUp : handleLogin;

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <h2>🐰 Bunny</h2>
        </div>
        <h1>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p className="login-subtitle">
          {isSignUp ? "Sign up to get started" : "Sign in to your Bunny account"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {!isSignUp && (
            <div className="form-actions">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (isSignUp ? "Creating account..." : "Signing in...") : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="signup-link">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                style={{ background: "none", border: "none", color: "#3AB46F", cursor: "pointer", textDecoration: "underline" }}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }}
                style={{ background: "none", border: "none", color: "#3AB46F", cursor: "pointer", textDecoration: "underline" }}
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
