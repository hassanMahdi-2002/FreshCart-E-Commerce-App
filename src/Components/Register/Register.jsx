import React, { useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    
    let navigate = useNavigate();

    async function handleRegister(values) {
        setIsLoading(true); 
        setApiError(''); 

        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                name: values.userName,
                email: values.userEmail,
                phone: values.userPhone,
                password: values.userPassword,
                rePassword: values.rePassword
            });
            
            // console.log("User Added Successfully:", data);
            setIsLoading(false);
            navigate('/login');
            
        } catch (error) {

            // console.error("API Error", error);
           if (error.response && error.response.data && error.response.data.message) {
                setApiError(error.response.data.message);
            } else {
                setApiError('Something went wrong during registration.');
            }
            
            setIsLoading(false);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            userName: '',
            userEmail: '',
            userPhone: '',
            userPassword: '',
            rePassword: ''
        },
        onSubmit: handleRegister,
        validate: function (values) {
            let errors = {};

            if (!values.userName) {
                errors.userName = "User Name is required.";
            } else if (values.userName.length < 3 || values.userName.length > 25) {
                errors.userName = "User Name Must contain from 3 to 25 Characters Only.";
            }

            if (!values.userEmail) {
                errors.userEmail = "Email is required.";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)) {
                errors.userEmail = "Email Must be valid.";
            }

            if (!values.userPhone) {
                errors.userPhone = "Phone number is required.";
            } else if (!/^01[0125][0-9]{8}$/.test(values.userPhone)) {
                errors.userPhone = "Phone Must Be Egyptian Number.";
            }

            if (!values.userPassword) {
                errors.userPassword = "Password is required.";
            } else if (values.userPassword.length < 6 || values.userPassword.length > 12) {
                errors.userPassword = "Password Must be from 6 to 12 Characters Only.";
            }

            if (!values.rePassword) {
                errors.rePassword = "Confirm Password is required.";
            } else if (values.userPassword !== values.rePassword) {
                errors.rePassword = "Password and RePassword not Matched.";
            }

            return errors;
        }
    });

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-9">
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                        
                        <div className="text-center mb-4">
                            <h2 className="fw-bolder text-primary">Create an Account</h2>
                            <p className="text-muted">Join FreshCart and start shopping</p>
                        </div>

                        {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ''}

                        <form onSubmit={myFormik.handleSubmit}>
                            
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userName} 
                                    className="form-control" 
                                    name="userName" 
                                    id="userName"
                                />
                                <label htmlFor="userName">User Name</label>
                            </div>
                            {myFormik.errors.userName && myFormik.touched.userName ? <div className="alert alert-danger py-2">{myFormik.errors.userName}</div> : ''}
                            
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userEmail} 
                                    className="form-control" 
                                    name="userEmail" 
                                    id="userEmail"
                                    autoComplete="email"
                                />
                                <label htmlFor="userEmail">Email Address</label>
                            </div>
                            {myFormik.errors.userEmail && myFormik.touched.userEmail ? <div className="alert alert-danger py-2">{myFormik.errors.userEmail}</div> : ''}

                            <div className="form-floating mb-3">
                                <input 
                                    type="tel" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userPhone} 
                                    className="form-control" 
                                    name="userPhone" 
                                    id="userPhone"
                                />
                                <label htmlFor="userPhone">Phone Number</label>
                            </div>
                            {myFormik.errors.userPhone && myFormik.touched.userPhone ? <div className="alert alert-danger py-2">{myFormik.errors.userPhone}</div> : ''}    

                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.userPassword} 
                                    className="form-control" 
                                    name="userPassword" 
                                    id="userPassword"
                                    autoComplete="new-password"
                                />
                                <label htmlFor="userPassword">Password</label>
                            </div>
                            {myFormik.errors.userPassword && myFormik.touched.userPassword ? <div className="alert alert-danger py-2">{myFormik.errors.userPassword}</div> : ''}    
                            
                            <div className="form-floating mb-4">
                                <input 
                                    type="password" 
                                    onBlur={myFormik.handleBlur} 
                                    onChange={myFormik.handleChange} 
                                    value={myFormik.values.rePassword} 
                                    className="form-control" 
                                    name="rePassword" 
                                    id="rePassword" 
                                    placeholder="Confirm Password" 
                                />
                                <label htmlFor="rePassword">Confirm Password</label>
                            </div>
                            {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger py-2">{myFormik.errors.rePassword}</div> : ''}
                            
                            <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill fw-bold" disabled={isLoading}>
                                {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Register Now'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}