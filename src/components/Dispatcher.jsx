import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Dispatcher = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<p>Welcome to Wildquarters! Preference form component goes here</p>} />
                <Route path="/matches" element={<p>Matches component goes here</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Dispatcher;