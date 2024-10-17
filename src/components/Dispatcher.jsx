import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from '../pages/PrefForm.jsx';
import Matches from '../pages/Matches.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import { useDbData } from '../utilities/firebase';


const Dispatcher = () => {
    const [roommates, error] = useDbData('/roommateInfo');
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
    if (!roommates) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrefForm/>} />
                <Route path="/matches" element={<Matches roommates={roommates} />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;