import React, { useContext, useRef, useState } from 'react';
import './UploadImage.css';
import upload from '../../../../Assets/images/upload image/upload.jpg'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const UploadImage = ({ setUploadImage }) => {

    const { user, updateUserAccount } = useContext(AuthContext)

    const inputRef = useRef(null);
    const [image, setImage] = useState('');

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = event => {
        const file = event.target.files[0];
        setImage(file)
    }

    const updateUserPhoto = () => {
        const profile = {
            photoURL: URL.createObjectURL(image)
        }

        updateUserAccount(profile)
            .then(() => {
                toast.success('User Photo Update')
                setUploadImage(false)
            })
            .catch(err => alert('Something went wrong. Please try again'))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <h2 style={{ marginBottom: '30px' }}>Upload Photo Here</h2>
            <span onClick={() => setUploadImage(false)} class="upload-image-close">&times;</span>
            <div onClick={handleImageClick}>

                {
                    image ?
                        <>
                            <img className='upload-photo-here' src={URL.createObjectURL(image)} alt=''></img>
                            <br></br>
                        </>

                        :

                        <img className='upload-photo-here' src={upload} alt=''></img>
                }
                <input onChange={handleImageChange} style={{ display: 'none' }} type='file' ref={inputRef}></input>

            </div>

            {
                image && <button onClick={updateUserPhoto} className='avatar-btn'>Select This Image</button>
            }

        </div >

    );
};

export default UploadImage;