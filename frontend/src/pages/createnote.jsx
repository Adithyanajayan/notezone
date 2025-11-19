import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CreateNote = () => {
    const [subjects, setSubjects] = useState([]);
    const [noteData, setNoteData] = useState({
        title: '',
        subject: '',
        content: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        try {
            const token = localStorage.getItem("access");
            const res = await api.get("subjects/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubjects(res.data);
        } catch (err) {
            console.error("Failed to load subjects", err);
        }
    };

    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access");

            const res = await api.post(
                "notes/create-from-text/",
                noteData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const downloadUrl = res.data.file_url;
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${noteData.title}.pdf`;
            link.click();

            navigate('/dashboard');
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="create-note">
            <div className="container">
                <h1>Create New Note</h1>

                <form onSubmit={handleSubmit} className="note-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={noteData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <select
                            name="subject"
                            value={noteData.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name="content"
                            rows="15"
                            value={noteData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn primary-btn">Generate PDF</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
