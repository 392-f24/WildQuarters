import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from './PrefForm.jsx';
import Matches from './Matches';

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