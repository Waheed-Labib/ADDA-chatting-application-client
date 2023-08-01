import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserAccount = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unSubscribe()
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        googleSignIn,
        createUser,
        signIn,
        updateUserAccount
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;