import {useState} from 'react'; 

const PrefForm = () => {
    const [data, setData] = useState(
        {
            name: '',
            major: '',
            desc: '', 
            location: '',
            size: '',
            wakeUpTime: '',
            bedTime: '',
            guests: '',
            clean: '',
            noise: '',
            pets: ''
        })


    return (
        <form>


            <button>Submit</button>
        </form>
    );



}

export default PrefForm;