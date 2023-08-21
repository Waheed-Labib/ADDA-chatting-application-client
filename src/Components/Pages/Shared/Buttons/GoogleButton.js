import React, { useContext, useEffect, useState } from 'react';
import google from '../../../../Assets/images/logo/google.png'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaRegSmileBeam } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleButton = () => {

    const { googleSignIn, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                setUser(user)
                console.log(user)
                toast.success(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '10px' }}>Welcome {user.displayName}</p>
                        <FaRegSmileBeam></FaRegSmileBeam>
                    </div>
                )
                const isExistingUser = users.find(usr => usr.uid === user.uid);

                if (isExistingUser) {
                    const from = location.state?.from?.pathname || `/chatbox/${user?.uid}`;
                    navigate(from, { replace: true });
                }
                else {
                    const userMongoProfile = {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        gender: '',
                        dateOfBirth: '',
                        occupation: '',
                        institute: '',
                        address: ''
                    }

                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userMongoProfile)
                    })
                        .then(res => res.json())
                        .then(data => {

                            const from = `/profile/${user.uid}`
                            navigate(from, { replace: true })

                        }
                        )

                        .catch(err => console.error(err))
                }

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