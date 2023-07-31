import React, { useContext } from 'react';
import { FaBackward, FaSignInAlt } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import google from '../../../Assets/images/logo/google.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const SignIn = () => {

    const { signIn, setUser } = useContext(AuthContext);

    const handleSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                alert("Sign in Successful")
                form.reset();
            })
            .catch(err => alert(err.message))

    }

    return (
        <div>
            <h1 className='page-heading'>Sign in To Your ADDA Account</h1>
            <div className='create-account'>

                <form onSubmit={handleSignIn} className='sign-up-form'>

                    <label><h3>Email:</h3></label>
                    <br />
                    <input type="email" name="email" placeholder='Your Email' />
                    <br /><br />

                    <label><h3>Password:</h3></label>
                    <br />
                    <input type="password" name="password" placeholder='Password' />
                    <br /><br />

                    <input className='submit-btn' type="submit" value="Submit"></input>
                </form>


                <div className='sign-up-page-links'>
                    <Link to='/'>
                        <button className='return-btn'>
                            <FaBackward></FaBackward>
                            &nbsp;
                            Return to the Front Cover
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
                    <button className='google-sign-in-btn'>
                        <img style={{ height: '25px', width: '30px' }} src={google} alt=''></img>
                        &nbsp;
                        Sign in with Google
                    </button>
                    <br></br>
                    <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>
                </div>
            </div>
        </div>
    );
};

export default SignIn;