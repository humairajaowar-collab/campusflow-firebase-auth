import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError('');
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== data.get('confirmPassword')) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try { await createUser(data.get('name'), data.get('email').trim(), data.get('password')); navigate('/dashboard'); }
    catch (err) { setError(err.message.replace('Firebase: ', '')); }
    finally { setBusy(false); }
  };
  return <section className="auth-layout register-layout"><div className="auth-aside"><span className="eyebrow">START SOMETHING GOOD</span><h1>Make room<br/>for <em>what's next.</em></h1><p>Set up your CampusFlow identity and enjoy a simple, secure way to access your space.</p><div className="aside-decoration">✳<span>+</span></div><small>YOUR JOURNEY · STARTS HERE</small></div><div className="auth-panel"><div className="auth-heading"><span className="eyebrow">GET STARTED</span><h2>Create account</h2><p>It only takes a minute.</p></div><form onSubmit={submit} className="auth-form"><label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required maxLength="60"/></label><label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required/></label><label>Password<input name="password" type="password" placeholder="At least 6 characters" autoComplete="new-password" required minLength="6"/></label><label>Confirm password<input name="confirmPassword" type="password" placeholder="Enter password again" autoComplete="new-password" required minLength="6"/></label><button className="button primary full" disabled={busy}>{busy ? 'Creating account…' : 'Create my account'} <span>→</span></button></form>{error && <p className="form-error">{error}</p>}<p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></div></section>;
}
