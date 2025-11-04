import React, { useState } from 'react';
import NoteCard from '../components/NoteCard';

const SearchNotes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        rating: '',
        sortBy: 'relevance'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Add search logic here
        const mockResults = [
            {
                id: 1,
                title: 'React Hooks',
                description: 'Understanding React Hooks',
                category: 'Programming',
                rating: 4.7,
                downloads: 200
            },
            {
                id: 2,
                title: 'Node.js Basics',
                description: 'Introduction to Node.js',
                category: 'Backend',
                rating: 4.3,
                downloads: 150
            }
        ];
        setSearchResults(mockResults);
    };

    const handleDownload = (noteId) => {
        console.log('Downloading note:', noteId);
    };

    return (
        <div className="search-notes">
            <div className="container">
                <h1>Search Notes</h1>

                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search notes by title, description, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="btn primary-btn">Search</button>
                    </div>

                    <div className="filters">
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            <option value="Programming">Programming</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                        </select>

                        <select
                            value={filters.rating}
                            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                        >
                            <option value="">Any Rating</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                        </select>

                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        >
                            <option value="relevance">Relevance</option>
                            <option value="rating">Highest Rated</option>
                            <option value="downloads">Most Downloaded</option>
                        </select>
                    </div>
                </form>

                <div className="search-results">
                    <h2>Search Results</h2>
                    <div className="notes-grid">
                        {searchResults.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchNotes;