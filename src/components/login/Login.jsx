import React, { useState } from 'react';
import "./Login.css"
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').max(255).required('email is required'),
    password: yup
    .string()
    .required('please enter your password')
    .matches()
});


const Login = () => {
    const history = useHistory();
    const {currentUser, login} = useAuth();

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    
    const onSubmit = async (data, e) => {
        e.preventDefault();
        try{
            login(data.email, data.password).then((userCredential) => {
                if(userCredential){
                    history.push("/");
                    reset();
                }
              })
              .catch((error) => {
                // const errorCode = error.code;
                // console.log(errorCode)
                const errorMessage = error.message;
                // console.log(errorMessage);
                if(errorMessage){
                    setPasswordError("Wrong password.")
                }
              });
        }catch{
            setError("Invalid email or password");
        }
    }

    return (
        <>
           {
               !currentUser ? (
                <div className="login__component">
                    <div className="login__container">
                        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <Alert variant="danger">{error}</Alert>}
                            <div className="mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="email" 
                                    name="email"
                                    {...register('email')}
                                />
                                {errors.email?.message && <p className="error__style">{errors.email?.message}</p>}
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control"
                                    id="password" 
                                    name="password"
                                    {...register('password')}
                                />
                                {passwordError && <p className="error__style">{passwordError}</p>}
                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit" 
                                    className="form-control btn btn-primary"
                                    disabled={!isDirty || !isValid}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="mt-2">
                                <p>Don't have an account ? <Link to="/signup">sign up</Link></p>
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
