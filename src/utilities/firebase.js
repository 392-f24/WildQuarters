// Import the functions you need from the SDKs you need
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';

import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';

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
