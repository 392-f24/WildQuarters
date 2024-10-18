import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from '../pages/PrefForm.jsx';
import EditPrefForm from '../pages/EditPrefForm.jsx';
import Matches from '../pages/Matches.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import Landing from '../pages/Landing.jsx';
import { useDbData } from '../utilities/firebase';
import { useAuthState } from '../utilities/firebase';

const Dispatcher = () => {
    const [roommates, error] = useDbData('/roommateInfo');
    const [user, loading] = useAuthState();
    
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
    if (!roommates) {
        return <div>Loading roommates...</div>;
    }
    if (loading) {
        return <div>Loading user...</div>
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing user={user}/>} />
                <Route path="/pref" element={<PrefForm/>} />
                <Route path="/matches" element={<Matches roommates={roommates} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/pref/edit" element={<EditPrefForm roommates={roommates}/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;