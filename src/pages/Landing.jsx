import { signInWithGoogle } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignInButton = () => {
    const navigate = useNavigate();
    return <button className="btn btn-dark" onClick={() => signInWithGoogle(navigate)}>Sign in</button>
};

const Landing = ({user}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            console.log("Returning user already logged in, welcome back!");
            navigate("/matches");
        }
      }, [user, navigate]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg" 
            width="200"
            height="200"/>
            <h1>Welcome to WildQuarters!</h1>
            <SignInButton />
        </div>
    );
};

export default Landing;