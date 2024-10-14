import './PrefForm.css';
import Question from './Question.jsx';
import { useState, useEffect } from 'react'; 
import { useNavigate } from "react-router-dom";
import { auth, useDbUpdate } from '../utilities/firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

const PrefForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [formCompleted, setFormCompleted] = useState(false);
    const db = getFirestore();

    const [data, setData] = useState({
        fullName: '',
        major: '',
        number: '',
        desc: '',
        gender: '',
        roommateGender: [],
        location: '',
        size: [],
        wakeUpTime: '',
        bedTime: '',
        guests: '',
        clean: '',
        noise: '',
    });

    const [update] = useDbUpdate(`/roommateInfo/${data.fullName}`);

    // Handler to update form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        const isCheckBox = name === 'roommateGender' || name === 'size';
        
        if (isCheckBox) {
            setData((prevData) => {
                const newAnsArr = prevData[name].includes(value) ? 
                                prevData[name].filter((ans) => value !== ans) : 
                                [...prevData[name], value];
                return { ...prevData, [name]: newAnsArr };
            });
        } else {
            setData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // On form submit
    const submit = async (evt) => {
        evt.preventDefault();
        // Adjust arrays with a single selection to be objects (for Firebase structure)
        if (data.size.length === 1) {
            data.size = { 0: data.size[0] };
        }
        if (data.roommateGender.length === 1) {
            data.roommateGender = { 0: data.roommateGender[0] };
        }

        // Update the data in Firebase
        await update(data);
        
        // Mark the form as completed in Firebase
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                formCompleted: true
            }, { merge: true });
        }

        console.log('Form submitted');
        navigate('/matches'); // Redirect to matches after submission
    };

    // Check if the form was already completed
    useEffect(() => {
        const checkFormCompleted = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().formCompleted) {
                    setFormCompleted(true);
                    navigate('/matches'); // Redirect if the form is already completed
                }
            }
        };
        checkFormCompleted();
    }, [user, db, navigate]);

    // Don't show the form if it's already completed
    if (formCompleted) {
        return null; // Or a message like: return <p>You've already completed the form.</p>;
    }

    return (
        <form onSubmit={submit}>
            <div className="personal-info">
                <h1>Personal Information</h1>
                <input
                    className="border rounded border-white"
                    type="text"
                    placeholder=" Full Name"
                    name="fullName"
                    value={data.fullName}
                    onChange={(event) => handleChange(event)}
                />
                <input
                    className="border rounded border-white"
                    type="text"
                    placeholder=" Major"
                    name="major"
                    value={data.major}
                    onChange={(event) => handleChange(event)}
                />
                <input
                    className="border rounded border-white"
                    type="text"
                    placeholder=" Phone Number"
                    name="number"
                    value={data.number}
                    onChange={(event) => handleChange(event)}
                />
                <textarea
                    className="border rounded border-white"
                    placeholder=" Description"
                    name="desc"
                    value={data.desc}
                    onChange={(event) => handleChange(event)}
                />
            </div>

            <Question label="Your Gender" name="gender" answers={['Male', 'Female', 'Non-binary', 'Other']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Roommate Gender" name="roommateGender" answers={['Male', 'Female', 'Non-binary', 'Any']} data={data} handleChange={handleChange} type="checkbox" />
            <Question label="Location" name="location" answers={['North', 'South']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Size" name="size" answers={['Double', 'Triple', 'Suite']} data={data} handleChange={handleChange} type="checkbox" />
            <Question label="Wake Up Time" name="wakeUpTime" answers={['6-8 AM', '8-10 AM', '10AM-12PM']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Bedtime" name="bedTime" answers={['Early', 'Late']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Guests" name="guests" answers={['Yes', 'No']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Cleanliness" name="clean" answers={['Messy', 'Clean']} data={data} handleChange={handleChange} type="radio" />
            <Question label="Noise Level Preference" name="noise" answers={['Quiet', 'Occasional', 'Fine with noises']} data={data} handleChange={handleChange} type="radio" />

            <button type="submit">Submit</button>
        </form>
    );
};

export default PrefForm;
