import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';

const InputCountry = ({ selectedCountry, setSelectedCountry, showCountryList, setShowCountryList, searchResults, setSearchResults }) => {

    const [countries, setCountries] = useState(null)

    const [searchCountry, setSearchCountry] = useState(true)

    const [underCursor, setUnderCursor] = useState(null);
    const [underCursorIndex, setUnderCursorIndex] = useState(null);



    const handleSearchCountry = () => {
        setSelectedCountry(null)
        setSearchCountry(true)
        setSearchResults(null)
        setShowCountryList(true)
        setUnderCursor(countries[0])
        setUnderCursorIndex(0)
    }

    const handleSearchChange = event => {
        const searched = event.target.value;
        const searchFounds = countries.filter(country => country.name.toLowerCase().indexOf(searched.toLowerCase()) === 0)
        setSearchResults(searchFounds)
        setUnderCursor(searchFounds[0])
        setUnderCursorIndex(0)
    }

    const handleCountrySelect = country => {
        setSelectedCountry(country)
        setSearchCountry(false)
        setShowCountryList(false)
        setSearchResults(null)
    }

    const handleKeyDownOnSearchCountry = event => {
        if (event.keyCode === 40 && underCursorIndex < (searchResults.length - 1)) {
            setUnderCursor(searchResults[underCursorIndex + 1])
            setUnderCursorIndex(underCursorIndex + 1)
        }

        if (event.keyCode === 38 && underCursorIndex > 0) {
            setUnderCursor(searchResults[underCursorIndex - 1])
            setUnderCursorIndex(underCursorIndex - 1)
        }

        if (event.key === 'Enter') {
            setSelectedCountry(underCursor)
            setSearchCountry(false)
            setShowCountryList(false)
            setSearchResults(null)
        }

    }
    const handleKeyDownOnCountryList = event => {
        if (event.keyCode === 40 && underCursorIndex < (countries.length - 1)) {
            setUnderCursor(countries[underCursorIndex + 1])
            setUnderCursorIndex(underCursorIndex + 1)
        }

        if (event.keyCode === 38 && underCursorIndex > 0) {
            setUnderCursor(countries[underCursorIndex - 1])
            setUnderCursorIndex(underCursorIndex - 1)
        }

        if (event.key === 'Enter') {
            setSelectedCountry(underCursor)
            setSearchCountry(false)
            setShowCountryList(false)
            setSearchResults(null)
        }
    }

    useEffect(() => {

        axios.get('https://restcountries.com/v3.1/all')
            .then(data => {
                // data.data.sort((a, b) => a.name?.common.localeCompare(b.name?.common));

                const countriesLoaded = data.data;
                const countriesData = countriesLoaded.map(country => {
                    const eachCountry = {
                        name: country.name.common,
                        flag: country.flags.png,
                        cca2: country.cca2
                    }

                    return eachCountry
                })

                setCountries(countriesData)

            })
    }, [])

    return (
        <>
            <h4>Country:</h4>
            <div>
                <div className='country-dropdown-bar address-input'>
                    <div className='country'>

                        {
                            searchCountry &&
                            !selectedCountry &&
                            <input
                                onFocus={handleSearchCountry}
                                onChange={handleSearchChange}
                                onKeyDown={searchResults ? handleKeyDownOnSearchCountry : handleKeyDownOnCountryList}
                                type='text'
                                className='country-search-input' placeholder='Search Country'>
                            </input>
                        }
                        {
                            selectedCountry &&
                            <div className='country'
                                style={{ marginBottom: '5px' }}
                                onClick={handleSearchCountry}
                            >
                                <img src={selectedCountry?.flag} alt=''></img>
                                <p>{selectedCountry?.name}</p>
                            </div>

                        }

                    </div>
                    {
                        showCountryList ?
                            <FaChevronUp
                                className='country-dropdown-icon'
                                onClick={() => setShowCountryList(false)}></FaChevronUp>
                            :
                            <FaChevronDown
                                className='country-dropdown-icon'
                                onClick={handleSearchCountry}></FaChevronDown>
                    }

                </div>
                {
                    searchResults &&
                    <div
                        className='country-list'>

                        {
                            searchResults.map(
                                country =>
                                    <>
                                        <div
                                            className={`country ${underCursor === country && 'under-cursor'}`}
                                            onClick={() => handleCountrySelect(country)}
                                            key={country?.cca2}>

                                            <img src={country?.flag} alt=''></img>

                                            <p>{country?.name}</p>

                                        </div>
                                        <hr></hr>
                                    </>

                            )
                        }
                    </div>

                }

                {
                    !searchResults &&
                    showCountryList &&
                    <div

                        className='country-list'>
                        {
                            countries.map(country =>
                                <>
                                    <div
                                        className={`country ${underCursor === country && 'under-cursor'}`}
                                        onClick={() => handleCountrySelect(country)}
                                        key={country?.cca2}>

                                        <img src={country?.flag} alt=''></img>

                                        <p>{country?.name}</p>
                                    </div>
                                    <hr></hr>
                                </>


                            )

                        }

                    </div>
                }


            </div>
        </>
    );
};

export default InputCountry;