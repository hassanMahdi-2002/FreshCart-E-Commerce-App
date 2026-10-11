import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function Layout({currentUser ,clearUserData}){
    return <>
        <Navbar clearUserData={clearUserData} currentUser = {currentUser} />
        <Outlet />
        <footer className='bg-dark text-white pt-5 pb-3 mt-5'>
                <div className='container pb-4'>
                    <h3 className='fw-bold'>Get the FreshCart APP</h3>
                    <p className='text-white'>We will send you a link, open it on your phone to download the app.</p>
                    
                    <div className="row g-3 mt-2">
                        <div className="col-12 col-md-9">
                            <input type="text" className='form-control' placeholder='Email...' />
                        </div>
                        <div className="col-12 col-md-3">
                            <button className='btn btn-primary w-100'>Share App Link</button>
                        </div>
                    </div>
                </div>

                <div className="container py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center border-top border-bottom border-secondary gap-4">

                    <div className="left-part d-flex flex-column flex-md-row align-items-center gap-2">
                        <h6 className='mb-0'>Payment partners</h6>
                        <ul className='list-unstyled d-flex mb-0 align-items-center gap-3'>
                            <li className='text-primary fs-4'>
                                <i className="fa-brands fa-paypal"></i>
                            </li>
                            <li className='text-primary fs-4'>
                                <i className="fa-brands fa-cc-paypal"></i>
                            </li>
                            <li className='text-primary fs-4'>
                                <i className="fa-brands fa-cc-mastercard"></i>
                            </li>
                        </ul>
                    </div>

                    <div className="right-part d-flex flex-column flex-md-row align-items-center gap-3">
                        <h6 className='mb-0'>Get deliveries with FreshCart</h6>
                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <button className='btn btn-outline-light'>
                                <i className="fa-brands me-2 fa-app-store"></i>App Store
                            </button>
                            <button className='btn btn-outline-light'>
                                <i className="fa-brands me-2 fa-google-play"></i>Google Play
                            </button>
                        </div>
                    </div>
                </div>
        </footer>
    </>
}