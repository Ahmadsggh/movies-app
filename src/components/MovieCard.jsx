import './MovieCard.css';

function MovieCard({ movie }) {
  const genreColors = {
    Drama: '#4a90d9',
    Crime: '#e94560',
    Action: '#f39c12',
    'Sci-Fi': '#9b59b6',
    Thriller: '#1abc9c',
    Fantasy: '#2ecc71',
  };

  const color = genreColors[movie.genre] || '#888';

  return (
    <div className="movie-card">
      <div className="movie-card-header">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-rating">⭐ {movie.rating}</span>
      </div>
      <div className="movie-info">
        <span className="movie-director">🎬 {movie.director}</span>
        <span className="movie-year">📅 {movie.year}</span>
      </div>
      <span className="movie-genre" style={{ backgroundColor: color }}>
        {movie.genre}
      </span>
    </div>
  );
}

export default MovieCard;
