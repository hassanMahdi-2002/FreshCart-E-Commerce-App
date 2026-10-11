import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({getUserData}) {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    let navigate = useNavigate();

    async function handleLogin(values) {
        setIsLoading(true); 
        setApiError(''); 

        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                email: values.userEmail,
                password: values.userPassword,
            });
            
            
            if (data.message === "success") {
                localStorage.setItem('userToken', data.token);
                getUserData();
            }
            setIsLoading(false);
            navigate('/home');
            
        } catch (error) {
            // console.error("API Error", error);
            if (error.response && error.response.data && error.response.data.message) {
                setApiError(error.response.data.message);
            } else {
                setApiError('Invalid Email or Password.');
            }
            setApiError('Invalid userEmail or Password.');
            setIsLoading(false);
        }
    }

    let users = {
        userEmail: '', 
        userPassword: '',
    }

    const myFormik = useFormik({
        initialValues: users,
        onSubmit: handleLogin,
        validate: function (values) {
            let errors = {};
            
            
            if (!values.userEmail.includes('@') || !values.userEmail.includes('.')) {
                errors.userEmail = "Email Must be valid.";
            }
            
            if (values.userPassword.length < 6 || values.userPassword.length > 12) {
                errors.userPassword = "Password Must be from 6 to 12 Characters Only."
            }
            
            return errors;
        }
    });

    return <>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-9">
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                        
                        <div className="text-center mb-4">
                            
                            <h2 className="fw-bolder text-primary">Login to FreshCart</h2>
                            <p className="text-muted">Welcome back! Please enter your details.</p>
                        </div>

                        {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ''}

                        <form onSubmit={myFormik.handleSubmit}>
                            
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userEmail} 
                                    className="form-control" 
                                    name="userEmail" 
                                    id="userEmail" 
                                    placeholder="userEmail"
                                    autoComplete="username"
                                />
                                <label htmlFor="userEmail">UserEmail</label>
                            </div>
                            {myFormik.errors.userEmail && myFormik.touched.userEmail ? <div className="alert alert-danger py-2">{myFormik.errors.userEmail}</div> : ''}

                            <div className="form-floating mb-4">
                                <input 
                                    type="password" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userPassword} 
                                    className="form-control" 
                                    name="userPassword" 
                                    id="userPassword" 
                                    placeholder="Password" 
                                    autoComplete="current-password"
                                />
                                <label htmlFor="userPassword">Password</label>
                            </div>
                            {myFormik.errors.userPassword && myFormik.touched.userPassword ? <div className="alert alert-danger py-2">{myFormik.errors.userPassword}</div> : ''}    
                            
                            <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill fw-bold" disabled={isLoading}>
                                {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}