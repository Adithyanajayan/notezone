import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNote = () => {
    const [noteData, setNoteData] = useState({
        title: '',
        description: '',
        subject: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", noteData.title);
        formData.append("description", noteData.description);
        formData.append("subject", noteData.subject);
        formData.append("file", noteData.file);

        try {
            const token = localStorage.getItem("access");

            await axios.post(
                "http://127.0.0.1:8000/api/notes/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            navigate('/dashboard');
        } catch (error) {
            console.error("Upload failed", error.response?.data);
        }
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
                            name="subject"
                            value={noteData.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Subject</option>
                            <option value="1">Programming</option>
                            <option value="2">Mathematics</option>
                            <option value="3">Science</option>
                            <option value="4">Literature</option>

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
