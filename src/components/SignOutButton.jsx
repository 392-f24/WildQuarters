import { signOut } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const navigate = useNavigate();
    return (<button className="btn btn-dark" onClick={() => signOut(navigate)}>Sign out</button>);
};

export default SignOutButton;