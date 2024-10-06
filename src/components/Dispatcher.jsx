import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Matches from './Matches';

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<p>Welcome to Wildquarters! Preference form component goes here</p>} />
                <Route path="/matches" element={<Matches />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;