import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
    const [noteData, setNoteData] = useState({
        title: '',
        description: '',
        category: '',
        file: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setNoteData({
                ...noteData,
                file: files[0]
            });
        } else {
            setNoteData({
                ...noteData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add note submission logic here
        console.log('Note data:', noteData);
        navigate('/dashboard');
    };

    return (
        <div className="add-note">
            <div className="container">
                <h1>Add Existing Note</h1>

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
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={noteData.description}
                            onChange={handleChange}
                            rows="4"
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
                        <label>Upload Note File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx,.txt"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn primary-btn">Add Note</button>
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

export default AddNote;