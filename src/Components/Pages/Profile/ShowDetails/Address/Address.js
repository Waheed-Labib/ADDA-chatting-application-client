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

        userMongoProfile.address = newAddress

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
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

        userMongoProfile.address = null

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
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
                                    <span onClick={handleCloseEditAddress} className="profile-info-close">&times;</span>

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

                                    <button style={{ width: '150px', paddingInline: '5px' }} onClick={handleHideAdddress} className='profile-info-hide-btn'>I won't share my address</button>

                                </div>
                                :
                                <div style={{ alignItems: 'start' }} className='profile-info-data'>
                                    {
                                        (address?.city || address?.province || address?.country) &&
                                        <div>
                                            <p style={{ marginBottom: '5px' }}>{address?.city}&nbsp;</p>
                                            <p style={{ marginBottom: '5px' }}>{address?.province}&nbsp;</p>
                                            <div style={{ padding: '0' }} className='country'>
                                                <img style={{ height: '15px' }} src={address?.country?.flag} alt=''></img>
                                                <p>{address?.country?.name}&nbsp;</p>
                                            </div>

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
                                <div style={{ padding: '0' }} className='country'>
                                    <img src={address?.country?.flag} alt=''></img>
                                    <p>{address?.country?.name}&nbsp;</p>
                                </div>
                            </div>
                        }
                    </>
            }

        </div >
    );
};

export default Address;