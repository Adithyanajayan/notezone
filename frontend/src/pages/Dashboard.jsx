import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import axios from 'axios';

const Dashboard = () => {
    const [recentNotes, setRecentNotes] = useState([]);
    const [stats, setStats] = useState({
        total_notes: 0,
        total_downloads: 0,
        average_rating: 0
    });

    useEffect(() => {
        fetchRecentNotes();
        fetchStats();
    }, []);

    const fetchRecentNotes = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/recent-notes/");
            setRecentNotes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/dashboard-stats/");
            setStats(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownload = async (noteId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/download/${noteId}/`);
            fetchStats();  // refresh stats after download
        } catch (error) {
            console.log(error);
        }
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
                                onDownload={() => handleDownload(note.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="stats">
                    <div className="stat-card">
                        <h3>Total Notes</h3>
                        <p>{stats.total_notes}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Downloads</h3>
                        <p>{stats.total_downloads}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Average Rating</h3>
                        <p>{stats.average_rating}/5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
