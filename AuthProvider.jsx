import { createContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const configurationError = () => new Error('Firebase is not configured yet. Add your Firebase web app settings to the .env file.');

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return undefined;
    }
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const requireConfig = () => {
    if (!isFirebaseConfigured) throw configurationError();
  };
  const createUser = async (name, email, password) => {
    requireConfig();
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
    return credential;
  };
  const signInUser = (email, password) => {
    requireConfig();
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    requireConfig();
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGithub = () => {
    requireConfig();
    return signInWithPopup(auth, githubProvider);
  };
  const logOut = () => {
    requireConfig();
    return signOut(auth);
  };

  const value = useMemo(() => ({ user, loading, createUser, signInUser, signInWithGoogle, signInWithGithub, logOut, isFirebaseConfigured }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
