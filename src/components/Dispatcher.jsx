import { Routes, Route, useNavigate } from 'react-router-dom';
import PrefForm from './PrefForm';
import Matches from './Matches';
import Login from './Login';
import { useAuthState } from '../utilities/firebase'; // Assume your useAuthState hook is defined in firebase.js
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Dispatcher = () => {
    const [user] = useAuthState(); // Get the current user
    const [formCompleted, setFormCompleted] = useState(false);
    const [loading, setLoading] = useState(true); // To avoid navigation during loading
    const db = getFirestore();
    const navigate = useNavigate();

    // Check if the form is completed for the current user
    useEffect(() => {
        const checkFormCompleted = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const formStatus = userDoc.data().formCompleted;
                    setFormCompleted(!!formStatus);
                }
            }
            setLoading(false); // Mark the loading as complete after the check
        };
        if (user) {
            checkFormCompleted();
        } else {
            setFormCompleted(false);
            setLoading(false); // Stop loading if no user
        }
    }, [user, db]);

    // Handle redirection based on form completion and user login status
    useEffect(() => {
        if (!loading) {
            if (user) {
                if (formCompleted) {
                    navigate("/matches");
                } else {
                    navigate("/pref-form");
                }
            } else {
                navigate("/"); // Navigate to login if no user
            }
        }
    }, [user, formCompleted, loading, navigate]);

    // Render the appropriate routes
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/pref-form" element={<PrefForm />} />
        </Routes>
    );
};

export default Dispatcher;
