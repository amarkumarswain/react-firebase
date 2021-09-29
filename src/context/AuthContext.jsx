import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase';

const authContext = React.createContext();

export function useAuth(){
    return useContext(authContext);
}

const AuthContext = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        auth.signOut();
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <>
            <authContext.Provider value={value}>
                {!loading && children}
            </authContext.Provider>
        </>
    )
}

export default AuthContext
