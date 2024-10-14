import React, { useEffect } from 'react';
import { signInWithGoogle, useAuthState } from '../utilities/firebase'; // Use the provided Google sign-in and auth state functions
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user] = useAuthState(); // Get the currently authenticated user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/matches"); // Redirect to matches if already logged in
    }
  }, [user, navigate]);

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className="auth-page">
      <div className="cover-title">
        <h1>Get your matches now!</h1>
        <p>Find your perfect match by signing in with Google.</p>
      </div>
      <button onClick={handleSignIn} className="google-signin-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
