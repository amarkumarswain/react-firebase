import React, { useState } from 'react'
import "./Register.css"
import 'react-toastify/dist/ReactToastify.css';
import {Alert} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const { signup, currentUser } = useAuth();

    const [users, setUsers] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //custom errors state
    const defaultState = {
        firstnameError: "",
        lastnameError: "",
        usernameError: "",
        emailError: "",
        passwordError: ""
    }
    const [errors, setErrors] = useState(defaultState);

    const {firstname, lastname, username, email, password} = users;

    function validate(){
        let firstnameError = "";
        let lastnameError = "";
        let usernameError = "";
        let emailError = "";
        let passwordError = "";

        //firstname config
        if(!firstname){
            firstnameError = "firstname is required";
        }

        //lastname config
        if(!lastname){
            lastnameError = "lastname is required";
        }

        //username config
        if(!username){
            usernameError = "username is required";
        }

        //email config
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!email){
            emailError = "email is required";
        }else if(reg.test(email) === false){
            emailError = "email is invalid";
        }

        //password config
        if(!password){
            passwordError = "password is required"
        }else if(password.length < 6){
            passwordError = "password length must be atleast 6 characters";
        }else if(password.length > 15){
            passwordError = "password length must not exceed 15 characters";
        }

        if(firstnameError || lastnameError || usernameError || emailError || passwordError){
            setErrors({
                firstnameError,
                lastnameError,
                usernameError,
                emailError,
                passwordError
            });
            return false;
        }

        return true;
    }

    let name;
    let value;
    const inputChangeHandler = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUsers({...users, [name]: value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            setErrors(defaultState);
        }
        try{
            setError("");
            setLoading(true);
            const response = await signup(email, password).then((desc) => {
                return db.collection('users').add({
                    firstname,
                    lastname,
                    username
                });
            });
            if(response){
                history.push("/");
                setUsers({
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: ""
                });
            }
        }catch{
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    const {firstnameError, lastnameError, usernameError, emailError, passwordError} = errors;
    return (
        <>
            {
                !currentUser ? (
                    <div className="register__component">
                <div className="register__container">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="firstname" className="form-label">First name</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="firstname" 
                                    name="firstname" 
                                    value={firstname.trim()}
                                    onChange={inputChangeHandler}
                                />
                                <p className="text-danger">{firstnameError}</p>
                            </div>
                            <div className="col">
                                <label htmlFor="lastname" className="form-label">Last name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastname" 
                                    name="lastname" 
                                    value={lastname.trim()}
                                    onChange={inputChangeHandler}
                                />
                                <p className="text-danger">{lastnameError}</p>
                            </div>
                        </div>
                        <div className="mt-1">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username"
                                value={username.trim()}
                                onChange={inputChangeHandler}
                            />
                            <p className="text-danger">{usernameError}</p>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                name="email"
                                value={email.trim()}
                                onChange={inputChangeHandler}
                            />
                            <p className="text-danger">{emailError}</p>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control"
                                id="password" 
                                name="password"
                                value={password.trim()}
                                onChange={inputChangeHandler}
                            />
                            <p className="text-danger">{passwordError}</p>
                        </div>
                        <div className="mt-3">
                            <button
                                type="submit" 
                                className="form-control btn btn-primary"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                        <div className="mt-2">
                            <p>Have an account yet? <Link to="/login">Login now</Link></p>
                        </div>
                    </form>
                </div>
            </div>
                ) : (<Redirect to="/" />)
            }
        </>
    )
}

export default Register
