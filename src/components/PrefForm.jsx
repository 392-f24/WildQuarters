import {useState} from 'react'; 

const PrefForm = () => {
    const [data, setData] = useState(
        {
            name: '',
            major: '',
            location: '',
            size: '',
            wakeUpTime: '',
            bedTime: '',
            guests: '',
            clean: '',
            noise: '',
        })


    return (
        <form>


            <button>Submit</button>
        </form>
    );



}

export default Preform;