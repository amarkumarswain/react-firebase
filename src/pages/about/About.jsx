import React from 'react'
import "./About.css"
import Navigation from '../../components/navigation/Navigation'

const About = () => {
    return (
        <>
            <Navigation />
            <div className="about__component">
                <div className="about__container">
                    <h1 data-testid="about">This is about page</h1>
                </div>
            </div>
        </>
    )
}

export default About
