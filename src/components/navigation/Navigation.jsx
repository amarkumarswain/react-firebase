import React from 'react'
import {Link, useHistory} from "react-router-dom"
import "./Navigation.css"
import { useAuth } from '../../context/AuthContext'

const Navigation = () => {
    const history = useHistory();
    const {logout} = useAuth();

    const logoutFunction = async () => {
        const response = await logout();
        if(response){
            history.push("/login");
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
                <div className="container">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/about">About</Link>
                        <button className="btn btn-primary" onClick={logoutFunction}>Log Out</button>
                    </div>
                </div>
                </div>
            </nav> 
        </>
    )
}

export default Navigation
