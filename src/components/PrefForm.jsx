import './PrefFormStyle.css';
import Question from './Question.jsx';


import { useState } from 'react'; 

const PrefForm = () => {
    const [data, setData] = useState({
        fullname: '',
        major: '',
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
                <label>Personal Information</label>
                <input type="text" placeholder="Full Name" name="fullname" value={data.fullname} onChange={(event) => handleChange(event)}/>
                <input type="text" placeholder="Major" name="major" value={data.major} onChange={(event) => handleChange(event)}/>
                <textarea placeholder="Description" name="desc" value={data.desc} onChange={(event) => handleChange(event)}/>
            </div>

            <Question label="Location" name="location" answers={['north', 'south']} data={data} handleChange={handleChange}/>

            <Question label="Size" name="size" answers={['double', 'triple']} data={data} handleChange={handleChange}/>

            <Question label="Wake Up Time" name="wakeUpTime" answers={['6-8 AM', '8-10 AM', '10AM-12PM']} data={data} handle={handleChange}/>

            <Question label="Bedtime" name="bedTime" answers={['early', 'late']} data={data} handleChange={handleChange}/>

            <Question label="Guests" name="guests" answers={['yes', 'no']} data={data} hanldeChange={handleChange}/>
            
            <Question label="Cleanliness" name="clean" answers={['messy', 'clean']} data={data} handleChange={handleChange}/>

            <Question label="Noise Level Preference" name="noise" answers={['quiet', 'occasional', 'fine with noises']} data={data} handleChange={handleChange}/>


            <button>Submit</button>       
        </form>
    );
};

export default PrefForm;
