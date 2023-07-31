import React, { useContext, useState } from 'react';
import { FaBackward, FaSignInAlt } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import google from '../../../Assets/images/logo/google.png'
import './CreateAccount.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';


const CreateAccount = () => {

    const { createUser, setUser } = useContext(AuthContext);

    const handleCreateAccount = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password === confirm) {
            createUser(email, password)
                .then(result => {
                    const user = result.user
                    setUser(user)
                    console.log(user)
                    alert(`It's Great, ${name} ! You are a member now.`)
                    form.reset();
                })
                .catch(err => console.error(err))
        }

        else {
            alert('Password did not match. Please try again.')
        }

    }

    return (
        <div>
            <h1 className='page-heading'>Create Your ADDA Account</h1>
            <div className='create-account'>

                <form onSubmit={handleCreateAccount} className='sign-up-form'>

                    <label><h3>User Name:</h3></label>
                    <br />
                    <input type="text" name="name" placeholder='User Name' />
                    <br /><br />

                    <label><h3>Email:</h3></label>
                    <br />
                    <input type="email" name="email" placeholder='Your Email' />
                    <br /><br />

                    <label><h3>Password:</h3></label>
                    <br />
                    <input type="password" name="password" placeholder='Password' />
                    <br /><br />

                    <label><h3>Confirm Password:</h3></label>
                    <br />
                    <input type="password" name="confirm" placeholder='Confirm Password' />
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
                    <Link to='/signin'>
                        <button className='already-member-btn'>
                            <FaSignInAlt></FaSignInAlt>
                            &nbsp;
                            Already A Member?
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

export default CreateAccount;