import '../styles/Profile.css';
import { useDbData } from '../utilities/firebase';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';


const Profile = () =>  {
    const [roommates, error] = useDbData('/roommateInfo');

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!roommates) {
        return <div>Loading...</div>;
    }

    const fieldMapping = {
        bedTime : 'Bedtime',
        clean : 'Cleanliness',
        guests : 'Guests',
        location : 'Location',
        noise : 'Noise Level',
        size : 'Room Size',
        wakeUpTime : 'Wake Up'
      }

    const self = roommates["Chris Riesbeck"];
    const pref = Object.entries(self)
                        .map(([key, val]) => {
                            return key ==='fullName' || key === 'desc' || key === 'number' || key === 'profilePhoto' ? null : 
                            (<div key={key} className="pref">
                                {typeof val === 'string' ? `${fieldMapping[key]} : ${val}` : `${key} : ${val.join(',')}`}
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

        <img className="profile-picture" src={self.profilePhoto} />
        <h3>{self.fullName}</h3>

        <SignOutButton />

        <div className="pref-container">
            <p>Preferences</p>
            {pref}
        </div>
    </div>);

}

export default Profile;