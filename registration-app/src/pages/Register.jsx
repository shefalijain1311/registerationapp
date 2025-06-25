import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    
    const { register, loading } = useAuth();
    const navigate = useNavigate();

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

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        });

        if (result.success) {
            alert("🎉 Registration successful! 🎉");
            navigate('/'); // Redirect to home or dashboard
        } else {
            setErrors({ submit: result.message });
        }
    };

    return (
        <div className="register-container d-flex vh-100">
            {/* Left Panel */}
            <div
                className="col-md-6 p-0 text-white d-flex flex-column justify-content-center align-items-center"
                style={{ backgroundColor: "#2c1e38" }}
            >
                <div className="text-center" style={{ width: "80%", maxWidth: "400px" }}>
                    <p className="fw-bold mb-1 fs-4">OnlyPipe</p>
                    <h2 className="fw-bold mb-3">Get Started with Us</h2>
                    <p className="mb-4">Complete these easy steps to register your account.</p>

                    <div className="d-flex flex-column align-items-center gap-3">
                        <button className="btn btn-light d-flex align-items-center justify-content-center px-3 py-2 w-100 fw-semibold small">
                            1. Sign up your account
                        </button>
                        <button className="btn btn-light d-flex align-items-center justify-content-center px-3 py-2 w-100 fw-semibold small">
                            2. Set up your workspace
                        </button>
                        <button className="btn btn-light d-flex align-items-center justify-content-center px-3 py-2 w-100 fw-semibold small">
                            3. Set up your profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="col-md-6 d-flex justify-content-center align-items-center bg-black text-white" style={{ minHeight: "100vh" }}>
                <div className="w-100 px-4" style={{ maxWidth: "500px" }}>
                    <h2 className="text-center fw-bold mb-2">Sign Up Account</h2>
                    <p className="text-center mb-4">Enter your personal data to create your account.</p>

                    <div className="d-flex justify-content-between mb-3">
                        <button className="btn btn-outline-light w-50 me-2 d-flex align-items-center justify-content-center">
                            <FaGoogle className="me-2" />
                            Google
                        </button>
                        <button className="btn btn-outline-light w-50 d-flex align-items-center justify-content-center">
                            <FaGithub className="me-2" />
                            GitHub
                        </button>
                    </div>

                    <div className="text-center text-light mb-3">or</div>

                    {errors.submit && (
                        <div className="alert alert-danger" role="alert">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">First Name</label>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    className={`form-control bg-dark text-white ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className="col">
                                <label className="form-label">Last Name</label>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    className={`form-control bg-dark text-white ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                className={`form-control bg-dark text-white ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-control bg-dark text-white ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`form-control bg-dark text-white ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Re-enter password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="showPassword"
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label className="form-check-label text-light" htmlFor="showPassword">
                                Show Password
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-light w-100 fw-bold"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <p className="text-center text-light mt-3">
                            Already have an account?{" "}
                            <a href="/login" className="text-info text-decoration-none">Log in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;