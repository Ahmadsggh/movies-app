import { useState } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import './MainPage.css';

function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Step 1: Filter by search query
  const filtered = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query)
    );
  });

  // Step 2: Sort the filtered results
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'rating-asc') return a.rating - b.rating;
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'year-asc') return a.year - b.year;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="main-page">
      <div className="main-hero">
        <h1>🎬 Movie Database</h1>
        <p>Browse, search, and sort through the greatest films of all time</p>
      </div>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by title, director, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By...</option>
          <option value="rating-desc">⭐ Rating: High to Low</option>
          <option value="rating-asc">⭐ Rating: Low to High</option>
          <option value="year-desc">📅 Year: Newest First</option>
          <option value="year-asc">📅 Year: Oldest First</option>
          <option value="title-asc">🔤 Title: A to Z</option>
        </select>
      </div>

      <p className="results-count">{sorted.length} movie{sorted.length !== 1 ? 's' : ''} found</p>

      {sorted.length > 0 ? (
        <div className="movies-grid">
          {sorted.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>😕 No movies found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
