import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  console.log('Home component - isAuthenticated:', isAuthenticated);
  console.log('Home component - user:', user);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-dark text-light">
      <nav className="navbar navbar-dark bg-dark shadow-sm px-4">
        <span className="navbar-brand mb-0 h1">ELECTRIFY SERVICES LLM</span>
        {isAuthenticated && (
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, {user?.firstName}!</span>
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center">
        <div className="container">
          {isAuthenticated ? (
            <div>
              <h1 className="display-5 fw-bold mb-3">Welcome back, {user?.firstName} {user?.lastName}!</h1>
              <p className="lead mb-4">You are successfully logged in.</p>
            </div>
          ) : (
            <div>
              <h1 className="display-5 fw-bold mb-3">Get Started with Us</h1>
              <p className="lead mb-4">Complete these easy steps to register your account.</p>

              <div className="d-grid gap-3 col-12 col-md-6 mx-auto">
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => navigate('/register')}
                >
                  Sign up your account
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-3 text-muted">
        © 2025 OnlyPipe. All rights reserved.
      </footer>
    </div>
  );
}