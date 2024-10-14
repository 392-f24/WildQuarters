import './PrefForm.css';
import Question from './Question.jsx';
import { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import { useDbUpdate } from '../utilities/firebase';


const PrefForm = () => {
    const navigate = useNavigate();

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
        bedTime: '',     // for bedtime radio
        guests: '',      // for guests radio
        clean: '',       // for messy/clean radio
        noise: '',       // for noise level radio
    });

    
    const [update, result] = useDbUpdate(`/roommateInfo/${data.fullName}`);

    // Handler to update form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        const isCheckBox = name === 'roommateGender' || name === 'size';
        
        if(isCheckBox) {
            setData((prevData) => {
                const newAnsArr = prevData[name].includes(value) ? 
                                prevData[name].filter((ans) => value != ans) : 
                                [...prevData[name], value];

                const newData = {...prevData, [name]:newAnsArr};
                console.log(newData);
                return newData;
            })
           

        } else {
            setData((prevData) => {
                const newData = {...prevData, [name]:value};
                console.log(newData);
                return newData;
             });
        }

       
    };

    const submit = (evt) => {
        evt.preventDefault();
        //
        if (data.size.length == 1) {
            data.size = { 0: data.size[0] };
        }
        if (data.roommateGender.length == 1) {
            data.roommateGender = { 0: data.roommateGender[0] };
        }

        update(data);
        console.log('added');
        navigate('/matches');
    }

    return (
        <form onSubmit={submit}>
            <div className="personal-info">
                <h1>Personal Information</h1>
                <input className="border rounded border-white" type="text" placeholder=" Full Name" name="fullName" value={data.fullName} onChange={(event) => handleChange(event)}/>
                <input className="border rounded border-white" type="text" placeholder=" Major" name="major" value={data.major} onChange={(event) => handleChange(event)}/>
                <input className="border rounded border-white" type="text" placeholder=" Phone Number" name="number" value={data.number} onChange={(event) => handleChange(event)}/>
                <textarea className="border rounded border-white" placeholder=" Description" name="desc" value={data.desc} onChange={(event) => handleChange(event)}/>
            </div>

            <Question label="Your Gender" name="gender" answers={['Male', 'Female', 'Non-binary', 'Other']} data={data} handleChange={handleChange} type="radio" />

            <Question label="Roomate Gender" name="roommateGender" answers={['Male', 'Female', 'Non-binary', 'Any']} data={data} handleChange={handleChange} type="checkbox" />

            <Question label="Location" name="location" answers={['North', 'South']} data={data} handleChange={handleChange} type="radio" />

            <Question label="Size" name="size" answers={['Double', 'Triple', 'Suite']} data={data} handleChange={handleChange} type="checkbox"/>

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