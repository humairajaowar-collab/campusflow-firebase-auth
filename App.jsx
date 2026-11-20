import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

function RouteLoader() { return <div className="loader-wrap"><span className="spinner" />Checking your session…</div>; }
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <RouteLoader />;
  return user ? children : <Navigate to="/login" replace />;
}
function GuestRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <RouteLoader />;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return <BrowserRouter><Navbar /><main className="page-shell"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="*" element={<div className="empty-state"><h2>Page not found</h2><a className="button primary" href="/">Back to home</a></div>} />
  </Routes></main><footer className="footer">CampusFlow · Secure access, made simple</footer></BrowserRouter>;
}
