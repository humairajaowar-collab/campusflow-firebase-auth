import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function Navbar() {
  const { user, logOut, isFirebaseConfigured } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogout = async () => {
    setError('');
    try { await logOut(); navigate('/'); setMenuOpen(false); }
    catch (err) { setError(err.message); }
  };
  return <><header className="topbar"><nav className="nav container">
    <Link to="/" className="brand"><span className="brand-mark">C</span><span>campus<span className="brand-accent">flow</span><small>AUTHENTICATION PORTAL</small></span></Link>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
      {user ? <><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink><NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink><button className="nav-logout" onClick={handleLogout}>Sign out ↗</button></> : <><NavLink to="/login" onClick={() => setMenuOpen(false)}>Log in</NavLink><Link className="button nav-cta" to="/register" onClick={() => setMenuOpen(false)}>Get started <span>↗</span></Link></>}
    </div>
  </nav></header>{!isFirebaseConfigured && <div className="setup-strip">Setup required: add your Firebase web configuration before using authentication.</div>}{error && <p className="form-error center-message">{error}</p>}</>;
}
