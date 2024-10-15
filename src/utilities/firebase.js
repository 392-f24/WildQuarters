// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
// so apparently we were getting errors because there were a ref from both database and storage, 
//so they were overwriting other. so if we rename them that can fix it
import { getDatabase, onValue, ref as databaseRef, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInAnonymously } from 'firebase/auth'; // AUTH STUFF


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
const storage = getStorage(firebase);
const auth = getAuth(firebase); // AUTH STUFF

// Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in anonymously:', error.code, error.message);
  });


export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(databaseRef(database, path), (snapshot) => {
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
    update(databaseRef(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const useStorageUpload = (storagePath) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileURL, setFileURL] = useState('');

  const upload = async (file) => {
    setUploading(true);
    setError(null);

    try {
      const storageReference = storageRef(storage, storagePath);
      const snapshot = await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFileURL(downloadURL);
      setUploading(false);
      return { ref: snapshot.ref, url: downloadURL };
    } catch (err) {
      setError(err);
      setUploading(false);
      console.error('Upload failed:', err);
    }
  };

  return [upload, uploading, fileURL, error];
};
