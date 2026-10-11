import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

export default function ProDetails() {
    const { addProductToCart, deleteProductFromCart } = useContext(cartContext);
    
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showDelMsg, setShowDelMsg] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const { id } = useParams(); 

    async function addMyProduct(productId) {
        let response = await addProductToCart(productId);
        if (response && response.status === "success") {
            setShowSuccessMsg(true);
            setIsInCart(true); 
            setTimeout(() => {
                setShowSuccessMsg(false);
            }, 2000);
        }
    }

    async function deleteMyProduct(productId) {
        let response = await deleteProductFromCart(productId);
        if (response && response.status === "success") {
            setShowDelMsg(true);
            setIsInCart(false); 
            setTimeout(() => {
                setShowDelMsg(false);
            }, 2000);
        }
    }

    const [allDetails, setAllDetails] = useState(null);

    async function getAllDetails() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setAllDetails(data.data);
            // console.log(data);
            
        }
         catch (errors) {
            console.log("Errors: ", errors);
        }
    }

    useEffect(() => {
        getAllDetails();
    }, [id]);

    return (
        <>
            {allDetails ? (
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-md-5">
                            <div className="bg-white rounded-4 shadow-sm p-4 text-center">
                                <img
                                    src={allDetails.imageCover}
                                    className="w-100 rounded-3"
                                    alt={allDetails.title}
                                    style={{ objectFit: 'contain', maxHeight: '400px' }}
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="desc">
                                <p className="text-success fw-bolder text-uppercase mb-2">
                                    {allDetails.category?.name}
                                </p>

                                <h2 className="fw-bolder display-6 mb-3 text-dark">
                                    {allDetails.title}
                                </h2>

                                <div className="d-flex align-items-center mb-4">
                                    <i className="fa-solid fa-star text-warning me-2 fs-5"></i>
                                    <span className="fw-bold fs-5 text-muted">{allDetails.ratingsAverage}</span>
                                </div>

                                <p className="text-muted fs-5 lh-base mb-4">
                                    {allDetails.description}
                                </p>

                                <div className="d-flex align-items-center justify-content-between mb-4 pb-4 border-bottom">
                                    <h3 className="fw-bolder m-0 text-dark fs-1">${allDetails.price}</h3>

                                    {allDetails.quantity > 0 ? (
                                        <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                                            In Stock: {allDetails.quantity}
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                
                                {isInCart ? (
                                    <button onClick={() => { deleteMyProduct(id) }} className="delBtn btn btn-danger btn-lg w-100 shadow-sm fw-bold py-3 rounded-3 mt-2">
                                        <i className="fa-solid fa-trash me-2 fs-4"></i>
                                        <span className="fs-5">Remove from Cart</span>
                                    </button>
                                ) : (
                                    <button onClick={() => { addMyProduct(id) }} className="btn btn-success btn-lg w-100 shadow-sm fw-bold py-3 rounded-3 mt-2">
                                        <i className="fa-solid fa-cart-plus me-2 fs-4"></i>
                                        <span className="fs-5">Add to Cart</span>
                                    </button>
                                )}

                                {showSuccessMsg && (
                                    <div className="alert alert-success text-center my-3">
                                        Product Added Successfully....
                                    </div>
                                )}
                                {showDelMsg && (
                                    <div className="alert alert-danger text-center my-3">
                                        Product Removed Successfully....
                                    </div>
                                )}
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