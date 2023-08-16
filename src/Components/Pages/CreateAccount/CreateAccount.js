import React, { useContext } from 'react';
import { FaBackward, FaSignInAlt } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import './CreateAccount.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import GoogleButton from '../Shared/Buttons/GoogleButton';



const CreateAccount = () => {

    const { createUser, setUser, updateUserAccount } = useContext(AuthContext);
    const navigate = useNavigate();

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
                    console.log('User Created', user)

                    const profile = {
                        displayName: name
                    }
                    updateUserAccount(profile)
                        .then(() => {

                        })
                        .catch(err => console.error(err.meassage))

                    const userMongoProfile = {
                        uid: user.uid,
                        name,
                        email,
                        photoURL: '',
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

                            toast.success(`It's Great, ${name} ! You are a member now.`)
                            form.reset();

                            const from = `/profile/${user.uid}`
                            navigate(from, { replace: true })
                            console.log(data)
                        }
                        )

                        .catch(err => console.error(err))

                })
                .catch(err => toast.error(err.message))
        }

        else {
            toast.error('Password did not match. Please try again.')
        }

    }

    return (
        <div>

            <h1 className='page-heading'>
                Be A Member in ADDA
            </h1>

            <div className='flex-container'>

                <form onSubmit={handleCreateAccount} className='form-container'>

                    <label><h3>User Name:</h3></label>
                    <br />
                    <input type="text" name="name" placeholder='User Name' required />
                    <br /><br />

                    <label><h3>Email:</h3></label>
                    <br />
                    <input type="email" name="email" placeholder='Provide a valid Email Address' required />
                    <br /><br />

                    <label><h3>Password:</h3></label>
                    <br />
                    <input type="password" name="password" placeholder='Password' required />
                    <br /><br />

                    <label><h3>Confirm Password:</h3></label>
                    <br />
                    <input type="password" name="confirm" placeholder='Confirm Password' required />
                    <br /><br />

                    <input className='submit-btn' type="submit" value="Create Account"></input>

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
                    <Link to='/signin'>
                        <button className='already-member-btn'>
                            <FaSignInAlt></FaSignInAlt>
                            &nbsp;
                            Already A Member?
                        </button>
                    </Link>
                    <br></br>
                    <GoogleButton></GoogleButton>
                    <br></br>
                    <br></br>
                    <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>
                </div>
            </div>

        </div >
    );
};

export default CreateAccount;