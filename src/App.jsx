import React, { useState } from 'react';
import { Eye, EyeOff, Play, CheckCircle2, AlertCircle, LogOut, ShieldCheck, User } from 'lucide-react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authenticating
    setTimeout(() => {
      setIsLoading(false);
      const cleanUser = formData.username.trim();
      const cleanPass = formData.password;

      if (cleanUser === 'admin' && cleanPass === 'admin') {
        setIsLoggedIn(true);
      } else {
        setError('Invalid credentials. Hint: username = admin, password = admin');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setFormData({
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      password: 'admin'
    });
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    });
    setError('');
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <div className="card logged-in-card">
          <div className="success-icon-badge">
            <ShieldCheck size={36} color="#ffffff" />
          </div>
          <h2 className="title">Access Granted</h2>
          <p className="subtitle">Welcome back, <strong>admin</strong>! You have full administrative privileges.</p>
          
          <div className="session-info">
            <div className="session-item">
              <span>Role</span>
              <span className="badge">Administrator</span>
            </div>
            <div className="session-item">
              <span>Status</span>
              <span className="status-online"><span className="dot"></span> Online</span>
            </div>
            <div className="session-item">
              <span>Session ID</span>
              <code>ADM-99420-OK</code>
            </div>
          </div>

          <button className="continue-btn" onClick={handleLogout}>
            <span>Log Out</span>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="card">
        {/* Subtle Top Logo */}
        <div className="logo-wrapper">
          <div className="logo-icon"></div>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Two-column first name & last name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Email / Username field */}
          <div className="form-group">
            <label htmlFor="username">Email address</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your email address"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={18} className="eye-icon" />
                ) : (
                  <Eye size={18} className="eye-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button matching screenshot */}
          <button type="submit" className="continue-btn" disabled={isLoading}>
            <span>{isLoading ? 'Verifying...' : 'Continue'}</span>
            <Play size={12} fill="currentColor" className="play-icon" />
          </button>
        </form>

        {/* Quick demo autofill helper */}
        <div className="demo-helper">
          <p>
            Allowed login: <code>admin</code> / <code>admin</code>
          </p>
          <button type="button" className="autofill-btn" onClick={handleFillDemo}>
            Autofill Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

