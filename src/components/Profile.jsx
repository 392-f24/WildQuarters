import '../styles/Profile.css';
import { useDbData } from '../utilities/firebase';
import { Link } from 'react-router-dom';


const Profile = () =>  {
    const [roommates, error] = useDbData('/roommateInfo');

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!roommates) {
        return <div>Loading...</div>;
    }

    const self = roommates["Levy Deckard"];
    const pref = Object.entries(self)
                        .map(([key, val]) => {
                            return key ==='fullName' || key === 'desc' || key === 'number' ? null : 
                            (<div key={key} className="pref">
                                {typeof val === 'string' ? `${key} : ${val}` : `${key} : ${val.join(',')}`}
                            </div>)
                        })

    
    const imgUrl = 'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1728950400&semt=ais_hybrid';

    return (
    <div className="profile-container">
        <div className="profile-header">
            <p className="profile-title">Profile</p>
            <Link className="edit-link" to="/pref/edit">
                <p className="profile-title">Edit</p>
            </Link>
        </div>
        
        <img className="profile-picture" src={imgUrl} />
        <h3>{self.fullName}</h3>

        <div className="pref-container">
            <p style={{color : 'black'}}>Preferences</p>
            {pref}
        </div>
    </div>);

}

export default Profile; 