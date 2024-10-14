import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from './PrefForm.jsx';
import Matches from './Matches';
import Login from './Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../utilities/firebase';

const Dispatcher = () => {
    const [user] = useAuthState(auth);
    const [formCompleted, setFormCompleted] = useState(false);
    const db = getFirestore();

    useEffect(() => {
        const checkFormCompleted = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().formCompleted) {
                    setFormCompleted(true);
                } else {
                    setFormCompleted(false);
                }
            }
        };
        checkFormCompleted();
    }, [user, db]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/pref-form" element={!formCompleted ? <PrefForm /> : <Matches />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;
