import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

export const auth = getAuth(app);
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

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const deleteAccount = () => {
        console.log('inside delete user', user)
        return deleteUser(auth.currentUser)
    }

    useEffect(() => {
        setLoading(true)
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
        updateUserAccount,
        resetPassword,
        verifyEmail,
        deleteAccount,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;