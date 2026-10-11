import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cartProducts, numOfCartItems, totalCartPrice , deleteProductFromCart , updataCounter  } = useContext(cartContext);

    return (
        <>
            {cartProducts ? (
                <div className="container py-5 bg-light min-vh-100">
                    <div className="mb-4">
                        <h2 className="fw-bold">Shopping Cart</h2>
                        <p className="text-muted">You have {numOfCartItems} items in your cart</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-8">
                            {cartProducts.length === 0 ? (
                                <div className="text-center bg-white p-5 shadow-sm rounded">
                                    <h3 className="text-muted mb-3">Your cart is empty!</h3>
                                    <Link to="/" className="btn btn-primary text-white">Start Shopping</Link>
                                </div>
                            ) : (
                                cartProducts.map(function (pro) {
                                    return (
                                        <div key={pro.product._id} className="card border-0 shadow-sm mb-3">
                                            <div className="row g-0 align-items-center">
                                                <div className="col-md-3 p-2 text-center">
                                                    <img
                                                        src={pro.product.imageCover}
                                                        className="img-fluid rounded"
                                                        alt={pro.product.title}
                                                        style={{ height: "150px", objectFit: "contain" }}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <h5 className="card-title fw-bold text-truncate" title={pro.product.title}>
                                                            {pro.product.title}
                                                        </h5>
                                                        <p className="card-text text-muted mb-1 small">
                                                            Brand: <span className="text-dark fw-semibold">{pro.product.brand.name}</span> | 
                                                            Category: <span className="text-dark fw-semibold">{pro.product.category.name}</span>
                                                        </p>
                                                        <p className="card-text mb-2">
                                                            <span className="text-warning"><i className="fa-solid fa-star"></i> {pro.ratingsAverage}</span>
                                                        </p>
                                                        <h5 className="text-primary fw-bold">${pro.price}</h5>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 text-center p-3">
                                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                                        <button onClick={() => updataCounter(pro.product._id, pro.count - 1)} className="btn btn-outline-danger btn-sm"><i className="fa-solid fa-minus"></i></button>
                                                        <span className="mx-3 fw-bold fs-5">{pro.count}</span>
                                                        <button  onClick={() => updataCounter(pro.product._id, pro.count + 1)} 
                                                         className="btn btn-outline-success btn-sm"><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <button onClick={()=> {deleteProductFromCart(pro.product.id)}} className="btn btn-sm btn-light text-danger w-100">
                                                        <i className="fa-solid fa-trash me-1"></i> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 position-sticky" style={{ top: "100px" }}>
                                <h4 className="fw-bold mb-4">Order Summary</h4>
                                
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>Items ({numOfCartItems})</span>
                                    <span>${totalCartPrice}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>Shipping</span>
                                    <span className="text-success">Free</span>
                                </div>
                                
                                <hr />
                                
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="fw-bold">Total Price</h5>
                                    <h5 className="fw-bold text-primary">${totalCartPrice}</h5>
                                </div>

                                <Link to="/payment">
                                    <button className="btn btn-primary w-100 py-2 fs-5">
                                        Proceed to Checkout
                                    </button>
                                
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}