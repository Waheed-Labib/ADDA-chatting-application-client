import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../contexts/AuthProvider';
import { FaChevronDown, FaChevronUp, FaEdit, FaSearch } from 'react-icons/fa';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';
import { toast } from 'react-hot-toast'
import InputCountry from './InputCountry';

const Address = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)

    const [address, setAddress] = useState(userMongoProfile?.address || null);
    const [editAddress, setEditAddress] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(userMongoProfile?.address?.country || null);
    const [showCountryList, setShowCountryList] = useState(false)
    const [searchResults, setSearchResults] = useState(null);
    const [province, setProvince] = useState(userMongoProfile?.address?.province || '');
    const [city, setCity] = useState(userMongoProfile?.address?.city || '');

    const handleCloseEditAddress = () => {
        setEditAddress(false)
        setShowCountryList(false)
        setSearchResults(null)
    }

    const handleProvinceChange = event => {
        setProvince(event.target.value);
    }

    const handleCityChange = event => {
        setCity(event.target.value);
    }

    const handleAddressSubmit = event => {
        event.preventDefault();


        const newAddress = {
            country: selectedCountry,
            province: province,
            city: city
        }

        // update address in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: userMongoProfile?.gender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: userMongoProfile?.institute,
            address: newAddress
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
                toast.success('Address Updated')
                setAddress(newAddress)
                setEditAddress(false)
            })
            .catch(() => { })

    }

    const handleHideAdddress = () => {

        // hide address in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: userMongoProfile?.gender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: userMongoProfile?.institute,
            address: ''
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
                toast.success('Your Address will be hidden')
                setAddress('')
                setEditAddress(false)
            })
            .catch(() => { })
    }

    return (
        <div className='profile-info'>
            <h3>Address :</h3>

            {
                user?.uid === userMongoProfile?.uid ?
                    <>
                        {
                            editAddress ?
                                <div className='edit-address-div'>
                                    <span onClick={handleCloseEditAddress} class="profile-info-close">&times;</span>

                                    <form onSubmit={handleAddressSubmit} className='address-form'>
                                        {/* select country */}
                                        <InputCountry
                                            selectedCountry={selectedCountry}
                                            setSelectedCountry={setSelectedCountry}
                                            showCountryList={showCountryList}
                                            setShowCountryList={setShowCountryList}
                                            searchResults={searchResults}
                                            setSearchResults={setSearchResults}
                                        ></InputCountry>

                                        {/* input province */}
                                        <h4>State/Province/
                                            <br className='d-none d-md-block' />
                                            Division/Region:</h4>
                                        <input onChange={handleProvinceChange} className='address-input' type='text' placeholder='type here' defaultValue={province}></input>

                                        {/* input city */}
                                        <h4>City/District:</h4>
                                        <input onChange={handleCityChange} className='address-input' type='text' placeholder='type here' defaultValue={city}></input>

                                        <input style={{ width: '150px' }} className='profile-info-submit-btn' type="submit" value="Submit" />

                                    </form>

                                    <button style={{ width: '150px' }} onClick={handleHideAdddress} className='profile-info-hide-btn'>Hide my Address</button>

                                </div>
                                :
                                <div style={{ alignItems: 'start' }} className='profile-info-data'>
                                    {
                                        (address?.city || address?.province || address?.country) &&
                                        <div>
                                            <p>{address?.city}&nbsp;</p>
                                            <p>{address?.province}&nbsp;</p>
                                            <p>{address?.country?.name?.common}&nbsp;</p>
                                        </div>

                                    }

                                    <FaEdit onClick={() => setEditAddress(true)} className='edit-icon'></FaEdit>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            (address?.city || address?.province || address?.country) &&
                            <div>
                                <p>{address?.city}&nbsp;</p>
                                <p>{address?.province}&nbsp;</p>
                                <p>{address?.country?.name?.common}&nbsp;</p>
                            </div>
                        }
                    </>
            }

        </div >
    );
};

export default Address;