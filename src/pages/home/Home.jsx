import React, { useEffect, useState } from 'react'
import Navigation from '../../components/navigation/Navigation'
import "./Home.css"
import { useAuth } from '../../context/AuthContext'
import moment from 'moment'
import Moment from 'react-moment';

const Home = () => {
    const {currentUser} = useAuth();
    const currentDateTime = moment()

    return (
        <>
            <Navigation />
            <div className="home__component">
                <div className="home__container">
                    <h1 data-testid="home">Email:- {currentUser.email}</h1>
                    <Moment format='MMMM Do YYYY, h:mm:ss a'>{currentDateTime}</Moment>
                </div>
            </div>
        </>
    )
}

export default Home
