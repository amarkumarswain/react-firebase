import React, { useEffect, useState } from 'react'
import Navigation from '../../components/navigation/Navigation'
import "./Home.css"
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

const Home = () => {
    const {currentUser} = useAuth();
    const time = currentUser.metadata.creationTime;

    return (
        <>
            <Navigation />
            <div className="home__component">
                <div className="home__container">
                    <h1>Email:- {currentUser.email}</h1>
                    <h2>loginAt:- {time}</h2>
                </div>
            </div>
        </>
    )
}

export default Home
