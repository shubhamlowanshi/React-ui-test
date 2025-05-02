import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save token to localStorage (optional)
      localStorage.setItem('token', data.token);

      // Optionally save user info
      localStorage.setItem('user', JSON.stringify(data.user));

      setIsAuthenticated(true);
      setUsername(data.user.name);
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };


  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>
        Login User
      </div>

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Error Message */}
            {error && <p className="error-text">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="login-button">LOGIN</button>
          </form>

          <p className="register-text">
            New To Brains Kart? <Link to="/register" className="register-link">Register</Link>
          </p>

          <div className="logo">BRAINSKART</div>
        </div>
      </div>
    </>
  );
};

export default Login;
