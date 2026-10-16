import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", email.trim());

      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert("Cannot connect to server. Please start the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-login-page">
      <div className="wallet-decoration wallet-coin">₹</div>

      <div className="wallet-decoration wallet-card-small">
        💳
      </div>

      <div className="wallet">
        <div className="wallet-top">
          <div className="wallet-brand">
            <span className="wallet-logo">💰</span>
            <span>StudentSpend</span>
          </div>

          <div className="wallet-chip">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="wallet-strip"></div>

        <div className="wallet-content">
          <div className="wallet-title">
            <h1>Welcome Back</h1>
            <p>Manage your student expenses smartly.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="wallet-input">
              <span>✉️</span>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="wallet-input">
              <span>🔒</span>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="wallet-login-btn"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Signing in..." : "Unlock Wallet"}</span>
              <span>→</span>
            </button>
          </form>

          <div className="wallet-register">
            New to StudentSpend?
            <Link to="/register"> Create Account</Link>
          </div>
        </div>

        <div className="wallet-bottom">
          <span>STUDENT EXPENSE TRACKER</span>
          <span>•••• 2026</span>
        </div>
      </div>
    </div>
  );
}

export default Login;