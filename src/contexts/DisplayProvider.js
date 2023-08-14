import React, { createContext, useState } from 'react';

export const DisplayContext = createContext();

const DisplayProvider = ({ children }) => {

    const [displayFooter, setDisplayFooter] = useState(true)

    const displayInfo = {
        displayFooter,
        setDisplayFooter
    }

    return (
        <DisplayContext.Provider value={displayInfo}>
            {children}
        </DisplayContext.Provider>
    );
};

export default DisplayProvider;