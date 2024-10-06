import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrefForm from './PrefForm.jsx';

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrefForm/>} />
                <Route path="/matches" element={<p>Matches component goes here</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;