import React, { useContext, useState } from 'react';
import { FaBackward, FaFrown, FaSignInAlt } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import GoogleButton from '../Shared/Buttons/GoogleButton';
import './SignIn.css'
import { FaRegSmileBeam } from 'react-icons/fa'

const SignIn = () => {

    const { signIn, setUser, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('')

    const handleSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
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
                form.reset();
            })
            .catch(err => toast.error(err.message))

    }

    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }

    const handleForgotPassword = () => {
        if (email) {
            resetPassword(email)
                .then(alert('Please Check Your Email.'))
                .catch(err => console.error(err.message))
        }

        else {
            alert('Please Provide Your Email first.')
        }

    }

    return (
        <div>
            <h1 className='page-heading'>Sign in To Your ADDA Account</h1>
            <div className='flex-container'>

                <form onSubmit={handleSignIn} className='form-container'>

                    <label><h3>Email:</h3></label>
                    <br />
                    <input onBlur={handleEmailBlur} type="email" name="email" placeholder='Your Email' required />
                    <br /><br />

                    <label><h3>Password:</h3></label>
                    <br />
                    <input type="password" name="password" placeholder='Password' required />
                    <br /><br />

                    <input className='submit-btn' type="submit" value="Sign in"></input>
                    <br></br>
                    <br></br>
                    <Link onClick={handleForgotPassword} className='forgot-password'>
                        <FaFrown></FaFrown> &nbsp;
                        Forgot Password?
                    </Link>
                </form>


                <div className='sign-up-page-links'>
                    <Link to='/'>
                        <button className='return-btn'>
                            <FaBackward></FaBackward>
                            &nbsp;
                            Go Back to Front Cover
                        </button>
                    </Link>

                    <br></br>
                    <Link to='/register'>
                        <button className='already-member-btn'>
                            <FaSignInAlt></FaSignInAlt>
                            &nbsp;
                            Not A Member?
                        </button>
                    </Link>
                    <br></br>
                    <GoogleButton></GoogleButton>
                    <br></br>
                    <br></br>
                    <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>
                </div>
            </div>
        </div>
    );
};

export default SignIn;