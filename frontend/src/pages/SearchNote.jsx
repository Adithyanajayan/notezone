import React, { useState } from 'react';
import NoteCard from '../components/NoteCard';
import api from '../api';


const SearchNotes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        rating: '',
        sortBy: 'relevance'
    });

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await api.get("search-notes/", {
                params: {
                    search: searchTerm,
                    category: filters.category,
                    rating: filters.rating,
                    sort: filters.sortBy
                }
            });

            setSearchResults(response.data);

        } catch (error) {
            console.error("Search failed", error.response?.data || error.message);
        }
    };


    

    const handleDownload = async (noteId) => {
        try {
            const token = localStorage.getItem("access");

            const response = await api.get(`notes/${noteId}/download/`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Create local download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            // Get filename from response header
            const contentDisposition = response.headers["content-disposition"];
            let filename = "note.pdf";

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) filename = match[1];
            }

            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();

            console.log("Download successful!");

        } catch (error) {
            console.error("Download failed", error.response?.data || error);
        }
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