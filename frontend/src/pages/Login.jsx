import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('login/', formData);

            // Save tokens locally
            localStorage.setItem('access', response.data.tokens.access);
            localStorage.setItem('refresh', response.data.tokens.refresh);

            // Save user info
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));

            onLogin(user);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn primary-btn">Login</button>
                </form>
                <p>Don’t have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
};

export default Login;
