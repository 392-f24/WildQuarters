// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
// so apparently we were getting errors because there were a ref from both database and storage, 
//so they were overwriting other. so if we rename them that can fix it
import { getDatabase, onValue, ref as databaseRef, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, getAdditionalUserInfo } from 'firebase/auth'; // AUTH STUFF



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

export const signInWithGoogle = async (navigate) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Get signed-in user
    const isNewUser = getAdditionalUserInfo(result).isNewUser;

    if (isNewUser) {
      console.log("New user, welcome!");
      navigate("/pref")
    } else {
      console.log("Returning user, welcome back!");
      navigate("/matches")
    }
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

const firebaseSignOut = (navigate) => {
  signOut(auth).then(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }).catch((error) => {
    console.error("Error signing out: ", error);
  })
};

export { firebaseSignOut as signOut };
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => unsubscribe();
}, []);

  return [user, loading];
};

// // Sign in anonymously
// signInAnonymously(auth)
//   .then(() => {
//     console.log('Signed in anonymously');
//   })
//   .catch((error) => {
//     console.error('Error signing in anonymously:', error.code, error.message);
//   });


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

    if (!file) {
      console.log("nualsdfj")
      const hardcodedURL = 'https://www.markdarnelldds.com/wp-content/uploads/2017/01/profile-silhouette.jpg';
      setFileURL(hardcodedURL);
      setUploading(false);
      return { ref: null, url: hardcodedURL };
    }

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

  console.log(fileURL);

  return [upload, uploading, fileURL, error];
};
