import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
    const [recentNotes, setRecentNotes] = useState([
        {
            id: 1,
            title: 'React Fundamentals',
            description: 'Complete guide to React basics',
            category: 'Programming',
            rating: 4.5,
            downloads: 120
        },
        {
            id: 2,
            title: 'JavaScript ES6+',
            description: 'Modern JavaScript features',
            category: 'Programming',
            rating: 4.2,
            downloads: 89
        }
    ]);

    const handleDownload = (noteId) => {
        // Add download logic here
        console.log('Downloading note:', noteId);
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <div className="quick-actions">
                        <Link to="/search" className="btn primary-btn">Search Notes</Link>
                        <Link to="/add-note" className="btn secondary-btn">Add Existing Note</Link>
                        <Link to="/create-note" className="btn tertiary-btn">Create New Note</Link>
                    </div>
                </div>

                <div className="recent-notes">
                    <h2>Recent Notes</h2>
                    <div className="notes-grid">
                        {recentNotes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                </div>

                <div className="stats">
                    <div className="stat-card">
                        <h3>Total Notes</h3>
                        <p>45</p>
                    </div>
                    <div className="stat-card">
                        <h3>Downloads</h3>
                        <p>156</p>
                    </div>
                    <div className="stat-card">
                        <h3>Average Rating</h3>
                        <p>4.3/5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;