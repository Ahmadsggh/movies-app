import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">🎬 MovieDB</div>
      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
      </nav>
    </header>
  );
}

export default Header;
