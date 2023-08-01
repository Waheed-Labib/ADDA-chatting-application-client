import React, { useContext } from 'react';
import google from '../../../../Assets/images/logo/google.png'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaRegSmileBeam } from 'react-icons/fa'

const GoogleButton = () => {

    const { googleSignIn, setUser } = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                setUser(user)
                console.log(user)
                toast.success(<p>Welcome {user.displayName} <FaRegSmileBeam></FaRegSmileBeam></p>)
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <button onClick={handleGoogleLogin} className='google-sign-in-btn'>
            <img style={{ height: '25px', width: '30px' }} src={google} alt=''></img>
            &nbsp;
            Sign in with Google
        </button>
    );
};

export default GoogleButton;