import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import img from '../../assets/QazaqCinema.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-section">
        <Link to="/" className="logo-link">
          <img src={img} alt="QazaqCinema Logo" className="logo-img" />
        </Link> 
      </div>

      <div className={`nav-container ${menuOpen ? 'open' : ''}`}>
        <nav className="nav">
          <Link to="/Movies" onClick={() => setMenuOpen(false)}>Фильмдер</Link>
          <Link to="/Actors" onClick={() => setMenuOpen(false)}>Актерлар</Link>
          <Link to="/Director" onClick={() => setMenuOpen(false)}>Режиссерлар</Link>
          <Link to="/Reviewmovie" onClick={() => setMenuOpen(false)}>Рецензия</Link>
          <Link to="/Profile">Профиль</Link>
        </nav>
        <Link to="/login" className="login-button" onClick={() => setMenuOpen(false)}>Кіру</Link>
      </div>

      <button 
        className={`burger ${menuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Меню"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}