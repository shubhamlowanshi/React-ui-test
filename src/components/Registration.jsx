import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = ({ setIsAuthenticated, setUsername }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // After successful registration, redirect to login
      navigate('/login');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };


  return (
    <>
      <div style={{ backgroundColor: '#E3BE84', color: 'white', fontSize: '40px', padding: '15px' }}>Registration Form</div>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">User Registration</h2>

          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="login-input"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="login-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}

          {/* Submit Button */}
          <button className="login-button" onClick={handleSubmit}>Register</button>

          <div className="logo">BRAINSKART</div>

          {/* Link to login page */}
          <p className="register-text">
            Already have an account? <Link to='/login' className="register-link">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
