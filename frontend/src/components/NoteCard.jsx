import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDownload }) => {
    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p className="note-description">{note.description}</p>
            <div className="note-meta">
                <span>Category: {note.category}</span>
                <span>Rating: {note.rating}/5</span>
                <span>Downloads: {note.downloads}</span>
            </div>
            <div className="note-actions">
                <Link to={`/note/${note.id}`} className="btn view-btn">View Details</Link>
                <button onClick={() => onDownload(note.id)} className="btn download-btn">
                    Download
                </button>
            </div>
        </div>
    );
};

export default NoteCard;