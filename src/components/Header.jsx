import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-logo">🎬 MovieDB</div>
      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        {!user && <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>}
        {!user && <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink>}
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        {user && <span className="nav-user">👤 {user.username}</span>}
        {user && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Header;
