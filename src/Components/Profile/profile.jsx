import { Link } from "react-router-dom";

export default function Profile({ currentUser }) {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
                        <div className="mb-4">
                            <i className="fa-solid fa-circle-user text-primary" style={{ fontSize: "5rem" }}></i>
                        </div>
                        <h2 className="fw-bolder mb-2">Welcome, {currentUser?.name}</h2>
                        
                        {currentUser?.email && <p className="text-muted fs-5">{currentUser?.email}</p>}
                        
                        <hr className="my-4" />
                        
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/allOrders" className="btn btn-outline-primary px-4 py-2 rounded-pill">
                                <i className="fa-solid fa-box me-2"></i> My Orders
                            </Link>
                            <Link to="/cart" className="btn btn-outline-success px-4 py-2 rounded-pill">
                                <i className="fa-solid fa-cart-shopping me-2"></i> My Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}