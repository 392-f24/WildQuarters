import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from '../pages/PrefForm.jsx';
import Matches from '../pages/Matches.jsx';

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrefForm/>} />
                <Route path="/matches" element={<Matches />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;