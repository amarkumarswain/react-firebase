import React from 'react'
import Navigation from '../../components/navigation/Navigation'
import "./Home.css"
import { useAuth } from '../../context/AuthContext'

const Home = () => {
    const {currentUser} = useAuth();
    return (
        <>
            <Navigation />
            <div className="home__component">
                <div className="home__container">
                    <h1 data-testid="home">Email: {currentUser.email}</h1>
                </div>
            </div>
        </>
    )
}

export default Home
