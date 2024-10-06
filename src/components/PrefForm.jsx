import './PrefFormStyle.css';


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

            <div>
                <label>Location</label>
                <div>
                    <input 
                        type="radio"
                        name="location"
                        value="north"
                        checked={data.location === 'north'}
                        onChange={handleChange}/> North
                </div>

                <div>
                    <input 
                        type="radio"
                        name="location"
                        value="south"
                        checked={data.location === 'south'}
                        onChange={handleChange}/> South
                </div>
            </div>


            <div>
                <label>Room Size</label>
                <div>
                    <input 
                        type="radio"
                        name="size"
                        value="double"
                        checked={data.size === 'double'}
                        onChange={handleChange}/> Double
                </div>

                <div>
                    <input 
                        type="radio"
                        name="size"
                        value="triple"
                        checked={data.size === 'triple'}
                        onChange={handleChange}/> Triple
                </div>
            </div>

            <div>
                <label>Wake Up Time</label>
                <div>
                    <input 
                        type="radio"
                        name="wakeUpTime"
                        value="6-8 AM"
                        checked={data.wakeUpTime === '6-8 AM'}
                        onChange={handleChange}/> 6-8 AM
                </div>

                <div>
                    <input 
                        type="radio"
                        name="wakeUpTime"
                        value="8-10AM"
                        checked={data.wakeUpTime === '8-10AM'}
                        onChange={handleChange}/> 8-10AM
                </div>

                <div>
                    <input 
                        type="radio"
                        name="wakeUpTime"
                        value="8-10AM"
                        checked={data.wakeUpTime === '10AM-12PM'}
                        onChange={handleChange}/> 10AM-12PM
                </div>
            </div>

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
