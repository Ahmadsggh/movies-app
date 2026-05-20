import { useState, useEffect } from 'react';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../api/api';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import './MainPage.css';

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [form, setForm] = useState({ title: '', director: '', genre: '', year: '', rating: '' });
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getMovies();
      setMovies(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filtered = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query)
    );
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'rating-asc') return a.rating - b.rating;
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'year-asc') return a.year - b.year;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editMovie) {
        await updateMovie(editMovie._id, form);
      } else {
        await createMovie(form);
      }
      setForm({ title: '', director: '', genre: '', year: '', rating: '' });
      setShowForm(false);
      setEditMovie(null);
      fetchMovies();
    } catch {
      setError('Failed to save movie.');
    }
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setForm({ title: movie.title, director: movie.director, genre: movie.genre, year: movie.year, rating: movie.rating });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      const res = await deleteMovie(id);
      if (res.message === 'Movie deleted successfully.') {
        fetchMovies();
      } else {
        alert(res.message || 'Not authorized to delete this movie.');
      }
    } catch {
      setError('Failed to delete movie.');
    }
  };

  return (
    <div className="main-page">
      <div className="main-hero">
        <h1>🎬 Movie Database</h1>
        <p>Browse, search, and sort through the greatest films of all time</p>
        {user && (
          <button className="add-btn" onClick={() => { setShowForm(!showForm); setEditMovie(null); setForm({ title: '', director: '', genre: '', year: '', rating: '' }); }}>
            {showForm ? '✕ Cancel' : '+ Add Movie'}
          </button>
        )}
      </div>

      {showForm && user && (
        <form className="movie-form" onSubmit={handleFormSubmit}>
          <h3>{editMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
          {error && <div className="form-error">{error}</div>}
          <div className="form-row">
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input placeholder="Director" value={form.director} onChange={e => setForm({ ...form, director: e.target.value })} required />
          </div>
          <div className="form-row">
            <input placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required />
            <input placeholder="Year" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
            <input placeholder="Rating (0-10)" type="number" step="0.1" min="0" max="10" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} required />
          </div>
          <button type="submit" className="auth-btn">{editMovie ? 'Update Movie' : 'Add Movie'}</button>
        </form>
      )}

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by title, director, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort By...</option>
          <option value="rating-desc">⭐ Rating: High to Low</option>
          <option value="rating-asc">⭐ Rating: Low to High</option>
          <option value="year-desc">📅 Year: Newest First</option>
          <option value="year-asc">📅 Year: Oldest First</option>
          <option value="title-asc">🔤 Title: A to Z</option>
        </select>
      </div>

      <p className="results-count">{sorted.length} movie{sorted.length !== 1 ? 's' : ''} found</p>

      {loading ? (
        <div className="no-results"><p>Loading movies...</p></div>
      ) : sorted.length > 0 ? (
        <div className="movies-grid">
          {sorted.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              currentUser={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>😕 No movies found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
