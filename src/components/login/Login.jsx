import React, { useState } from 'react';
import "./Login.css"
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const defaultValues = {
    emailError: "",
    passwordError: ""
}

const Login = () => {
    const {currentUser} = useAuth();
    const history = useHistory();
    const {login} = useAuth();
    const [users, setUsers] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, serErrors] = useState(defaultValues);

    const {email, password} = users;

    let name;
    let value;
    const inputChangeHandler = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUsers({...users, [name]: value});
    }

    //check validation
    const validate = () => {
        let emailError = "";
        let passwordError = "";

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!email){
            emailError = "email is required";
        }else if(reg.test(email) === false){
            emailError = "email is invalid";
        }

        //password validation
        if(!password){
            passwordError = "password is required"
        }else if(password.length < 6){
            passwordError = "password length must be atleast 6 characters";
        }else if(password.length > 15){
            passwordError = "password length must not exceed 15 characters";
        }

        if(emailError || passwordError){
            serErrors({
                emailError,
                passwordError
            });
            return false;
        }
        return true;
    }

    async function handleSubmit(e){
        e.preventDefault();
        validate();
        try{
            const result = await login(email, password);
            if(result){
                setError("");
                setLoading(true);
                history.push("/");
                setUsers({
                    email: "",
                    password: ""
                });
            }
        }catch{
            setError("Failed to email");
        }
        setLoading(false);
    }

    const {emailError, passwordError} = errors;

    return (
        <>
           {
               !currentUser ? (
                <div className="login__component">
                    <div className="login__container">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <form className="login__form" onSubmit={handleSubmit}>
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
                                {
                                    emailError ? <p className="text-danger">{emailError}</p> : ""
                                }
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
                                {
                                    passwordError ? <p className="text-danger">{passwordError}</p> : ""
                                }
                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit" 
                                    className="form-control btn btn-primary"
                                    disabled={loading}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="mt-2">
                                <p>Have an account yet? <Link to="/signup">sign up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
               ) : (<Redirect to="/" />)
           } 
        </>
    )
}

export default Login
