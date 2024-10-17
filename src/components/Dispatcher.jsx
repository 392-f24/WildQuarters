import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from './PrefForm.jsx';
import Matches from './Matches';
import { useDbData } from '../utilities/firebase';
import testData from '../utilities/testData.json';

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
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;