import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Dispatcher from './components/Dispatcher'
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Dispatcher />
      </BrowserRouter>
    </div>
  );
};

export default App;
