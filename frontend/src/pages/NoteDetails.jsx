import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetails = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reportReason, setReportReason] = useState('');

    // Mock note data - replace with actual data fetching
    const note = {
        id: 1,
        title: 'React Fundamentals',
        content: 'This is the complete content of the note about React fundamentals...',
        category: 'Programming',
        author: 'John Doe',
        rating: 4.5,
        downloads: 120,
        uploadDate: '2024-01-15'
    };

    const handleDownload = () => {
        console.log('Downloading note:', id);
    };

    const handleRate = (newRating) => {
        setRating(newRating);
        // Add rating submission logic here
        console.log('Rating:', newRating);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // Add review submission logic here
        console.log('Review:', review);
        setReview('');
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        // Add report submission logic here
        console.log('Report reason:', reportReason);
        setReportReason('');
    };

    return (
        <div className="note-details">
            <div className="container">
                <div className="note-header">
                    <h1>{note.title}</h1>
                    <button onClick={handleDownload} className="btn primary-btn">
                        Download Note
                    </button>
                </div>

                <div className="note-meta">
                    <p><strong>Category:</strong> {note.category}</p>
                    <p><strong>Author:</strong> {note.author}</p>
                    <p><strong>Upload Date:</strong> {note.uploadDate}</p>
                    <p><strong>Downloads:</strong> {note.downloads}</p>
                    <p><strong>Rating:</strong> {note.rating}/5</p>
                </div>

                <div className="note-content">
                    <h2>Content</h2>
                    <div className="content-preview">
                        {note.content}
                    </div>
                </div>

                <div className="note-actions">
                    <div className="rating-section">
                        <h3>Rate this Note</h3>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    className={`star ${star <= rating ? 'active' : ''}`}
                                    onClick={() => handleRate(star)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="review-section">
                        <h3>Write a Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share your thoughts about this note..."
                                rows="4"
                            />
                            <button type="submit" className="btn secondary-btn">Submit Review</button>
                        </form>
                    </div>

                    <div className="report-section">
                        <h3>Report Note</h3>
                        <form onSubmit={handleReportSubmit}>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Reason for reporting this note..."
                                rows="3"
                                required
                            />
                            <button type="submit" className="btn danger-btn">Report</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetails;