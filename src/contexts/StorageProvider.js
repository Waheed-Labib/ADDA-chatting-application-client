import React from 'react';
import { getStorage } from "firebase/storage";
import app from "../firebase/firebase.config";
import { createContext } from 'react';

const storage = getStorage(app);
export const StorageContext = createContext();

const StorageProvider = ({ children }) => {

    const storageInfo = {
        storage
    }

    return (
        <StorageContext.Provider value={storageInfo}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;