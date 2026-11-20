import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function Login() {
  const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const run = async (action) => { setError(''); setBusy(true); try { await action(); navigate('/dashboard'); } catch (err) { setError(err.message.replace('Firebase: ', '')); } finally { setBusy(false); } };
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); run(() => signInUser(data.get('email').trim(), data.get('password'))); };
  return <section className="auth-layout"><div className="auth-aside"><span className="eyebrow">WELCOME BACK</span><h1>Good to see<br/><em>you again.</em></h1><p>Your campus space is just one sign-in away. Pick up right where you left off.</p><div className="aside-decoration">C<span>✦</span></div><small>ACCESS YOUR WORLD · CAMPUSFLOW</small></div><div className="auth-panel"><div className="auth-heading"><span className="eyebrow">YOUR ACCOUNT</span><h2>Sign in</h2><p>Enter your details to continue.</p></div><form onSubmit={submit} className="auth-form"><label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required/></label><label>Password<input name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required minLength="6"/></label><button className="button primary full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in to account'} <span>→</span></button></form><div className="separator"><span>OR CONTINUE WITH</span></div><div className="social-row"><button className="social-button" disabled={busy} onClick={() => run(signInWithGoogle)}>G&nbsp; Google</button><button className="social-button" disabled={busy} onClick={() => run(signInWithGithub)}>⌘&nbsp; GitHub</button></div>{error && <p className="form-error">{error}</p>}<p className="auth-switch">New to CampusFlow? <Link to="/register">Create an account</Link></p></div></section>;
}
