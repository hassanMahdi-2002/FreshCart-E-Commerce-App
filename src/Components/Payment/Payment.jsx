import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const nav = useNavigate();
    const { cartId } = useContext(cartContext);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Cash Order
    async function confirmCashOrder() {
        if (!cartId) return;
        setIsLoading(true);

        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                {
                    shippingAddress: {
                        details: document.querySelector("#details").value,
                        phone: document.querySelector("#phone").value,
                        city: document.querySelector("#city").value,
                    },
                },
                {
                    headers: { token: localStorage.getItem("userToken") },
                }
            );

            if (data.status === "success") {
                nav("/allOrders");
            }
        } catch (error) {
            console.log("Error in Cash Order: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    // 2. Credit Card Order (Online Payment)
    async function confirmCreditOrder() {
        if (!cartId) return;
        setIsLoading(true);

        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress: {
                        details: document.querySelector("#details").value,
                        phone: document.querySelector("#phone").value,
                        city: document.querySelector("#city").value,
                    },
                },
                {
                    headers: { token: localStorage.getItem("userToken") },
                    params: { url: window.location.origin }, 
                }
            );

            if (data.status === "success") {
                window.location.href = data.session.url;
            }
        } catch (error) {
            console.log("Error in Credit Order: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-primary text-white p-4 text-center">
                            <h3 className="fw-bold mb-1">Shipping Details</h3>
                            <p className="mb-0 small text-white-50">
                                Enter your details and choose your payment method
                            </p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-secondary" htmlFor="details">
                                        <i className="fa-solid fa-location-dot me-2 text-primary"></i> Address Details
                                    </label>
                                    <input className="form-control form-control-lg fs-6" type="text" placeholder="e.g. 12 Main St" id="details" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-secondary" htmlFor="phone">
                                        <i className="fa-solid fa-phone me-2 text-primary"></i> Phone Number
                                    </label>
                                    <input className="form-control form-control-lg fs-6" type="tel" placeholder="e.g. 01012345678" id="phone" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-secondary" htmlFor="city">
                                        <i className="fa-solid fa-city me-2 text-primary"></i> City
                                    </label>
                                    <input className="form-control form-control-lg fs-6" type="text" placeholder="e.g. Cairo" id="city" />
                                </div>

                                
                                <div className="d-flex flex-column gap-3">
                                    <button
                                        onClick={confirmCashOrder}
                                        type="button"
                                        disabled={isLoading}
                                        className="btn btn-primary btn-lg w-100 fw-bold py-3 shadow-sm rounded-3"
                                    >
                                        <i className="fa-solid fa-truck-fast me-2"></i> Confirm Cash Order
                                    </button>

                                    <button
                                        onClick={confirmCreditOrder}
                                        type="button"
                                        disabled={isLoading}
                                        className="btn btn-outline-primary btn-lg w-100 fw-bold py-3 shadow-sm rounded-3"
                                    >
                                        <i className="fa-solid fa-credit-card me-2"></i> Pay Online (Credit Card)
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}