import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
        const searchFounds = countries.filter(country => country.name?.common.toLowerCase().indexOf(searched.toLowerCase()) === 0)
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
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                setCountries(data.sort((a, b) => a.name?.common.localeCompare(b.name?.common)))
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
                                <img src={selectedCountry?.flags?.png} alt=''></img>
                                <p>{selectedCountry?.name?.common}</p>
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

                                            <img src={country?.flags?.png} alt=''></img>

                                            <p>{country?.name?.common}</p>

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

                                        <img src={country?.flags?.png} alt=''></img>

                                        <p>{country?.name?.common}</p>
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