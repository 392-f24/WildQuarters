import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/pref-form");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/matches");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/matches");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="cover-title">
        <h1>Get your matches now!</h1>
        <p>Find your perfect match by creating an account or logging in.</p>
      </div>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsRegister(!isRegister)} className="toggle-button">
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Login;
