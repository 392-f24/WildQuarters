// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCatCy-XcCN1rOORM-aRJAy4Zgom9FvdoM",
  authDomain: "wildquarters-nu.firebaseapp.com",
  databaseURL: "https://wildquarters-nu-default-rtdb.firebaseio.com",
  projectId: "wildquarters-nu",
  storageBucket: "wildquarters-nu.appspot.com",
  messagingSenderId: "996626540719",
  appId: "1:996626540719:web:068124383d1ac3eefbcc5a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // You can access the Google account details here if needed
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      // Handle Errors here.
      console.error('Error signing in with Google:', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Sign out
export const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
};

// Custom hook to track the authentication state
export const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return [user];
};

export { auth }; // Export the auth object if needed elsewhere

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

