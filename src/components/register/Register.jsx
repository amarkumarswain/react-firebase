import React, { useState, useEffect } from 'react'
import "./Register.css"
import 'react-toastify/dist/ReactToastify.css';
import {Alert} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let schema = yup.object().shape({
    firstname: yup.string().required('firstname is required'),
    lastname: yup.string().required('lastname is required'),
    username: yup.string().required('username is required'),
    email: yup.string().email('Must be a valid email').max(255).required('email is required'),
    password: yup
    .string()
    .required('please enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    )
});

const Register = () => {
    const history = useHistory();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const onSubmit = async (data) => {
        try{
            const res = await signup(data.email, data.password);
            const user = res.user;
            const response = await db.collection('users').add({
                uid: user.uid,
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username
            })
            if(response){
                history.push("/");
                reset();
                return response;
            }
        }catch{
            setError("Email is already exist");
        }
    }

    return (
        <>
            { !currentUser ? 
                <div className="register__component">
                    <div className="register__container">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="firstname" className="form-label">First name</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="firstname" 
                                        name="firstname" 
                                        {...register('firstname')}
                                    />
                                    {errors.firstname?.message && <p className="error__style">{errors.firstname?.message}</p>}
                                </div>
                                <div className="col">
                                    <label htmlFor="lastname" className="form-label">Last name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="lastname" 
                                        name="lastname" 
                                        {...register('lastname')}
                                    />
                                    {errors.lastname?.message && <p className="error__style">{errors.lastname?.message}</p>}
                                </div>
                            </div>
                            <div className="mt-1">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    name="username"
                                    {...register('username')}
                                />
                                {errors.username?.message && <p className="error__style">{errors.username?.message}</p>}
                            </div>
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
                                    Register
                                </button>
                            </div>
                            <div className="mt-2">
                                <p>Have an account yet? <Link to="/login">Login now</Link></p>
                            </div>
                        </form>       
                    </div>
                </div> 
            : <Redirect to="/" />}              
        </>
    )
}

export default Register
