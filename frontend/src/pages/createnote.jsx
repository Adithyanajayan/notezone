import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const [noteData, setNoteData] = useState({
        title: '',
        category: '',
        content: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add note creation logic here
        console.log('Created note:', noteData);
        navigate('/dashboard');
    };

    return (
        <div className="create-note">
            <div className="container">
                <h1>Create New Note</h1>

                <form onSubmit={handleSubmit} className="note-form">
                    <div className="form-group">
                        <label>Note Title</label>
                        <input
                            type="text"
                            name="title"
                            value={noteData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={noteData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Programming">Programming</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="Literature">Literature</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Note Content</label>
                        <textarea
                            name="content"
                            value={noteData.content}
                            onChange={handleChange}
                            rows="20"
                            placeholder="Start writing your note here..."
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn primary-btn">Create Note</button>
                        <button
                            type="button"
                            className="btn secondary-btn"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;

