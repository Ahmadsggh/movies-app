import './AuthPages.css';

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🔐 Login</h2>
        <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="auth-footer">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
