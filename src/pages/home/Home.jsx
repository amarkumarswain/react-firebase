import React from 'react'
import Navigation from '../../components/navigation/Navigation'
import "./Home.css"

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="home__component">
                <div className="home__container">
                    <h1>This is Home Page</h1>
                </div>
            </div>
        </>
    )
}

export default Home
