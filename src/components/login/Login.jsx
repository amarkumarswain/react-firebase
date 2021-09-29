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
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    )
});


const Login = () => {
    const history = useHistory();
    const {currentUser, login} = useAuth();

    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try{
            const result = await login(data.email, data.password);
            if(result){
                history.push("/");
                reset();
            }
        }catch{
            setError("Invalid email and password");
        }
    }

    return (
        <>
           {
               !currentUser ? (
                <div className="login__component">
                    <div className="login__container">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
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
                                {errors.password?.message && <p className="error__style">{errors.password?.message}</p>}
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
