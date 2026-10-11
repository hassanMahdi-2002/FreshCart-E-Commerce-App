import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function AllOrders({ currentUser }) {
    const [allOrders, setAllOrders] = useState(null);

    async function getAllOrders() {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${currentUser.id}`
            );
            setAllOrders(data);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        if (currentUser?.id) {
            getAllOrders();
        }
    }, [currentUser]);

    if (!allOrders) return <LoadingScreen />;


    <Helmet>
        <title>All Orders</title>
    </Helmet>
    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4 text-center text-main">Your Orders History</h2>

            {allOrders.length === 0 ? (
                <div className="text-center py-5">
                    <h4>No orders found yet!</h4>
                </div>
            ) : (
                <div className="row g-4">
                    {allOrders.map((order) => (
                        <div key={order._id || order.id} className="col-12">
                            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                                
                                <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom">
                                    <div>
                                        <span className="fw-bold text-secondary me-3">
                                            Order ID: #{order.id}
                                        </span>
                                        <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning text-dark'} me-2`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                        <span className={`badge ${order.isDelivered ? 'bg-success' : 'bg-primary'}`}>
                                            {order.isDelivered ? 'Delivered' : 'In Transit'}
                                        </span>
                                    </div>
                                    <div className="mt-2 mt-sm-0">
                                        <span className="fw-bold me-2">Payment:</span>
                                        <span className="badge bg-secondary text-uppercase">{order.paymentMethodType}</span>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        {order.cartItems.map((item) => (
                                            <div key={item._id} className="col-12 col-md-6 col-lg-4">
                                                <div className="d-flex align-items-center bg-light p-2 rounded-3 border">
                                                    <img
                                                        src={item.product.imageCover}
                                                        className="rounded-3 object-fit-cover me-3"
                                                        style={{ width: "70px", height: "70px" }}
                                                        alt={item.product.title}
                                                    />
                                                    <div className="overflow-hidden">
                                                        <h6 className="text-truncate mb-1 fw-bold">
                                                            {item.product.title}
                                                        </h6>
                                                        <div className="d-flex justify-content-between text-muted small">
                                                            <span>Count: {item.count}</span>
                                                            <span className="fw-bold text-main">
                                                                {item.price} EGP
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <hr className="my-4 text-muted" />

                                    <div className="row align-items-center">
                                        <div className="col-md-8 mb-2 mb-md-0">
                                            <p className="mb-1 text-muted small">
                                                <i className="fa-solid fa-location-dot me-1 text-danger"></i>
                                                <strong>Shipping Address:</strong> {order.shippingAddress?.details}, {order.shippingAddress?.city}
                                            </p>
                                            <p className="mb-0 text-muted small">
                                                <i className="fa-solid fa-phone me-1 text-success"></i>
                                                <strong>Phone:</strong> {order.shippingAddress?.phone}
                                            </p>
                                        </div>
                                        <div className="col-md-4 text-md-end">
                                            <span className="text-muted small d-block">Total Price</span>
                                            <h4 className="fw-bold text-main mb-0">
                                                {order.totalOrderPrice} EGP
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}