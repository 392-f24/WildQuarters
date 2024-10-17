import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">

            <NavLink className="navbar-icon" to="/matches">
                <i className="bi bi-heart-fill" style={{ color: 'purple' }}></i>
                <p>Matches</p>
            </NavLink>

            <NavLink className="navbar-icon">
                <i className="bi bi-chat" style={{ color: 'purple' }}></i>
                <p>Chat</p>
            </NavLink>

            <NavLink className="navbar-icon" to="/profile">
                <i className="bi bi-person-circle" style={{ color: 'purple' }}></i>
                <p>Profile</p>
            </NavLink>

        </nav>
    );

}

export default Navbar; 