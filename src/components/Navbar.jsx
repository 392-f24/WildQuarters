import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">

            <NavLink data-testid="heart-icon" className="navbar-icon" to="/matches">
                <i className="bi bi-heart-fill" style={{ color: 'purple' }}></i>
                <p><b>Matches</b></p>
            </NavLink>

            {/* <NavLink className="navbar-icon">
                <i className="bi bi-chat" style={{ color: 'purple' }}></i>
                <p>Chat</p>
            </NavLink> */}

            <NavLink className="navbar-icon" to="/profile">
                <i className="bi bi-person-circle" style={{ color: 'purple' }}></i>
                <p><b>Profile</b></p>
            </NavLink>

        </nav>
    );

}

export default Navbar; 