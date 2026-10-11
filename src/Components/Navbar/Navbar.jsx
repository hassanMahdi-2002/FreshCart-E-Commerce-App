import { Link, useNavigate } from "react-router-dom"
// import './Navbar.css'

export default function Navbar({currentUser, clearUserData}){
    const navigate = useNavigate();
    function logoutUser(){
        clearUserData();
        navigate('/login')
    }

    return<>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
            <div className="container-fluid">
                <Link className="navbar-brand p-2 fw-bolder" to = '/'>
                    <i className="fa-solid fa-cart-shopping me-2"></i>Fresh Cart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/brands'>Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/cart'>Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/allorders'>All Orders</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto me-4 px-4 mb-2 mb-lg-0">
                        {currentUser? <>
                            <li className="nav-item">
                                <Link className="nav-link" to='/Profile'>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={logoutUser} className="nav-link">Logout</span>
                            </li>
                        </>:<>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/register'>Register</Link>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
}