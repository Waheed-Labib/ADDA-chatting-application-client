import React, { useContext, useEffect, useRef, useState } from 'react';
import './UploadImage.css';
import upload from '../../../../Assets/images/upload image/upload.jpg'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { StorageContext } from '../../../../contexts/StorageProvider';

const UploadImage = ({ setUploadImage, setUserPhoto, userMongoProfile }) => {

    const { storage } = useContext(StorageContext)
    const { user, updateUserAccount } = useContext(AuthContext)

    const [image, setImage] = useState('');
    const [imageList, setImageList] = useState([])

    const inputRef = useRef(null);

    const imageListRef = ref(storage, `${user?.uid}-photos/`)

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = event => {
        const file = event.target.files[0];
        setImage(file);
        const formData = new FormData();
        formData.append('file', file);

    }

    const updateUserPhoto = () => {
        const imageRef = ref(storage, `${user?.uid}-photos/${user?.uid}-user-photo`)
        uploadBytes(imageRef, image)
            .then(() => {

            })

        const profile = {
            photoURL: imageList[0]
        }
        updateUserAccount(profile)
            .then(() => {
                toast.success('User Photo Updated')
                setUploadImage(false)
                setUserPhoto(URL.createObjectURL(image))

                const updatedUserMongoProfile = {
                    uid: userMongoProfile.uid,
                    name: userMongoProfile.name,
                    email: userMongoProfile.email,
                    photoURL: imageList[0],
                    gender: userMongoProfile.gender,
                    dateOfBirth: userMongoProfile.dateOfBirth,
                    occupation: userMongoProfile.occupation,
                    institute: userMongoProfile.institute,
                    address: userMongoProfile.address
                }

                fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedUserMongoProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => alert('Something Went Wrong'))
            })
    }

    useEffect(() => {
        listAll(imageListRef)
            .then(res => {
                res.items.forEach(item => {
                    getDownloadURL(item)
                        .then(url => {
                            setImageList((prev) => [url])
                        })
                })
            })
    }, [imageListRef])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <h2 style={{ marginBottom: '30px' }}>Upload Photo Here</h2>
            <span onClick={() => setUploadImage(false)} className="upload-image-close">&times;</span>
            <div onClick={handleImageClick}>

                {
                    image ?
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img className='upload-photo-here' src={URL.createObjectURL(image)} alt=''></img>
                            <br></br>
                            <Link style={{ color: 'darkblue', fontWeight: '500' }}><small>Try Another One?</small></Link>
                        </div>

                        :

                        <img className='upload-photo-here' src={upload} alt=''></img>
                }
                <input onChange={handleImageChange} style={{ display: 'none' }} type='file' ref={inputRef}></input>

            </div>

            {
                image && <>
                    <button onClick={updateUserPhoto} className='avatar-btn'>Select This Image</button>

                </>
            }



        </div >

    );
};

export default UploadImage;