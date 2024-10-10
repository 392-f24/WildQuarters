import './PrefForm.css';
import Question from './Question.jsx';
import { useState } from 'react'; 
import { Link } from "react-router-dom";


const PrefForm = () => {
    const [data, setData] = useState({
        fullname: '',
        major: '',
        desc: '',
        gender: '',
        roommateGender: '',
        location: '',
        size: '',
        wakeUpTime: '',
        bedTime: '',     // for bedtime radio
        guests: '',      // for guests radio
        clean: '',       // for messy/clean radio
        noise: '',       // for noise level radio
    });

    // Handler to update form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => {
           const newData = {...prevData, [name]:value};
           console.log(newData);
           return newData;
        });
    };

    return (
        <form>
            <div className="personal-info">
                <h1>Personal Information</h1>
                <input className="border rounded border-white" type="text" placeholder=" Full Name" name="fullname" value={data.fullname} onChange={(event) => handleChange(event)}/>
                <input className="border rounded border-white" type="text" placeholder=" Major" name="major" value={data.major} onChange={(event) => handleChange(event)}/>
                <textarea className="border rounded border-white" placeholder=" Description" name="desc" value={data.desc} onChange={(event) => handleChange(event)}/>
            </div>

            <Question label="Your Gender" name="gender" answers={['Male', 'Female', 'Non-binary', 'Other']} data={data} handleChange={handleChange} />

            <Question label="Roomate Gender" name="roommateGender" answers={['Male', 'Female', 'Non-binary', 'Any']} data={data} handleChange={handleChange} />

            <Question label="Location" name="location" answers={['North', 'South']} data={data} handleChange={handleChange}/>

            <Question label="Size" name="size" answers={['Double', 'Triple']} data={data} handleChange={handleChange}/>

            <Question label="Wake Up Time" name="wakeUpTime" answers={['6-8 AM', '8-10 AM', '10AM-12PM']} data={data} handleChange={handleChange}/>

            <Question label="Bedtime" name="bedTime" answers={['Early', 'Late']} data={data} handleChange={handleChange}/>

            <Question label="Guests" name="guests" answers={['Yes', 'No']} data={data} handleChange={handleChange}/>
            
            <Question label="Cleanliness" name="clean" answers={['Messy', 'Clean']} data={data} handleChange={handleChange}/>

            <Question label="Noise Level Preference" name="noise" answers={['Quiet', 'Occasional', 'Fine with noises']} data={data} handleChange={handleChange}/>


            <Link to="/matches">
                <button type="button">Submit</button>
            </Link>      
        </form>
    );
};

export default PrefForm;
