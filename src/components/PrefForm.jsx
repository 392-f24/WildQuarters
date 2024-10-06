import './PrefFormStyle.css';


import { useState } from 'react'; 

const PrefForm = () => {
    const [data, setData] = useState({
        name: '',
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
           const newData = {...prevData, [name]:value}
           return newData;
        });
    };

    return (
        <form>
            <div>
                <label>Bedtime:</label>
                <div>
                    <input 
                        type="radio" 
                        name="bedTime" 
                        value="early" 
                        checked={data.bedTime === 'early'}
                        onChange={handleChange}
                    /> Early
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="bedTime" 
                        value="late" 
                        checked={data.bedTime === 'late'}
                        onChange={handleChange}
                    /> Late
                </div>
            </div>

            <div>
                <label>Guests:</label>
                <div>
                    <input 
                        type="radio" 
                        name="guests" 
                        value="yes" 
                        checked={data.guests === 'yes'}
                        onChange={handleChange}
                    /> Yes
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="guests" 
                        value="no" 
                        checked={data.guests === 'no'}
                        onChange={handleChange}
                    /> No
                </div>
            </div>

            <div>
                <label>Cleanliness:</label>
                <div>
                    <input 
                        type="radio" 
                        name="clean" 
                        value="messy" 
                        checked={data.clean === 'messy'}
                        onChange={handleChange}
                    /> Messy
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="clean" 
                        value="clean" 
                        checked={data.clean === 'clean'}
                        onChange={handleChange}
                    /> Clean
                </div>
            </div>

            <div>
                <label>Noise Level Preference:</label>
                <div>
                    <input 
                        type="radio" 
                        name="noise" 
                        value="quiet" 
                        checked={data.noise === 'quiet'}
                        onChange={handleChange}
                    /> Quiet all times
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="noise" 
                        value="occasional" 
                        checked={data.noise === 'occasional'}
                        onChange={handleChange}
                    /> Occasional noise
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="noise" 
                        value="fineWithNoise" 
                        checked={data.noise === 'fineWithNoise'}
                        onChange={handleChange}
                    /> Fine with noises
                </div>
            </div>

            <button>Submit</button>       
        </form>
    );
};

export default PrefForm;
