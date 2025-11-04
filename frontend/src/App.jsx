import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import AddNote from './pages/AddNote';
import CreateNote from './pages/CreateNote';
import NoteDetails from './pages/NoteDetails';
import './App.css';
import SearchNotes from './pages/searchnote';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <SearchNotes /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-note"
            element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-note"
            element={isAuthenticated ? <CreateNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/note/:id"
            element={isAuthenticated ? <NoteDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;