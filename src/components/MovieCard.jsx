import './MovieCard.css';

function MovieCard({ movie, currentUser, onEdit, onDelete }) {
  const genreColors = {
    Drama: '#4a90d9',
    Crime: '#e94560',
    Action: '#f39c12',
    'Sci-Fi': '#9b59b6',
    Thriller: '#1abc9c',
    Fantasy: '#2ecc71',
  };

  const color = genreColors[movie.genre] || '#888';
  const isOwner = currentUser && movie.createdBy &&
    (movie.createdBy._id === currentUser.id || movie.createdBy === currentUser.id);

  return (
    <div className="movie-card">
      <div className="movie-card-header">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-rating">⭐ {movie.rating}</span>
      </div>
      <div className="movie-info">
        <span className="movie-director">🎬 {movie.director}</span>
        <span className="movie-year">📅 {movie.year}</span>
        {movie.createdBy && (
          <span className="movie-creator">👤 {movie.createdBy.username || 'Unknown'}</span>
        )}
      </div>
      <span className="movie-genre" style={{ backgroundColor: color }}>
        {movie.genre}
      </span>
      {isOwner && (
        <div className="movie-actions">
          <button className="edit-btn" onClick={() => onEdit(movie)}>✏️ Edit</button>
          <button className="delete-btn" onClick={() => onDelete(movie._id)}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
