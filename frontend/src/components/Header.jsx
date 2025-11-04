import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout, user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">NoteApp</Link>
                <nav className="nav">
                    {isAuthenticated ? (
                        <>
                            <span>Welcome, {user?.name}</span>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/search">Search Notes</Link>
                            <Link to="/add-note">Add Note</Link>
                            <Link to="/create-note">Create Note</Link>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;