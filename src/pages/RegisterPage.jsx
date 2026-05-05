import './AuthPages.css';

function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>📝 Create Account</h2>
        <p className="auth-subtitle">Join us today! Fill in the details below.</p>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="••••••••" />
          </div>
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
        <p className="auth-footer">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default RegisterPage;
