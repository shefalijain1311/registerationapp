import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { usePageStack } from "../context/PageStackContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const { pushPage } = usePageStack();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    pushPage("Login");
  }, [pushPage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData);

    if (result.success) {
      navigate('/'); // Redirect to home or dashboard
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center mb-4">Welcome Back</h2>

        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="email" 
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn-light w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-white">
            Register
          </a>
        </p>

        <p className="text-center mt-3">
          <a href="/forgot-password" className="text-light text-decoration-underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}