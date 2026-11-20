import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const name = user?.displayName || 'Name not provided';
  const provider = user?.providerData?.[0]?.providerId?.replace('.com', '') || 'Email & password';
  return <section className="profile-page"><div className="page-intro"><span className="eyebrow">ACCOUNT SETTINGS</span><h1>Your <em>profile.</em></h1><p>Personal information linked to your CampusFlow account.</p></div><article className="profile-card"><div className="profile-cover"/><div className="profile-main">{user?.photoURL ? <img className="profile-large-avatar" src={user.photoURL} alt="Profile"/> : <div className="profile-large-avatar avatar-initial">{(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}</div>}<span className="status-pill">● SIGNED IN</span><h2>{name}</h2><p>{user?.email}</p><div className="profile-details"><div><small>DISPLAY NAME</small><b>{name}</b></div><div><small>EMAIL ADDRESS</small><b>{user?.email || '—'}</b></div><div><small>AUTHENTICATION METHOD</small><b>{provider}</b></div><div><small>EMAIL STATUS</small><b>{user?.emailVerified ? 'Verified' : 'Not verified'}</b></div><div><small>ACCOUNT ID</small><b className="uid-text">{user?.uid || '—'}</b></div><div><small>ACCOUNT CREATED</small><b>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '—'}</b></div></div><Link to="/dashboard" className="button secondary">← Back to dashboard</Link></div></article></section>;
}
