import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import MySlider from './../Slider/Slider';
import { cartContext } from "../../Context/CartContext";

export default function Home() {
    const {  addProductToCart, deleteProductFromCart } = useContext(cartContext);
    const [allProduct, setAllProduct] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const [showDeleteMsg, setShowDeleteMsg] = useState(false);
    const [addedProductsIds, setAddedProductsIds] = useState([]); 

    async function getAllProducts() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setAllProduct(data.data);
        } 
        
        catch (error) {
            console.log("Errors: ", error);
        }
    }

    async function addMyProduct(id) {
        let response = await addProductToCart(id);
        if (response && response.status === "success") {
            setAddedProductsIds([...addedProductsIds, id]);
            setShowMsg(true);
            setTimeout(() => {
                setShowMsg(false);
            }, 2000);
        }
    }

    async function deleteMyProduct(id) {
        let response = await deleteProductFromCart(id);
        if (response && response.status === "success") {
            setAddedProductsIds(addedProductsIds.filter((productId) => productId !== id));
            setShowDeleteMsg(true);
            setTimeout(() => {
                setShowDeleteMsg(false);
            }, 2000);
        }
    }

    useEffect(function () {
        getAllProducts();
    }, []);

    return (
        <>
            {allProduct ? (
                <div className="container py-5">
                    <MySlider />
                    
                    {showMsg && (
                        <div className="alert bg-success position-fixed start-0 bottom-0 z-3 text-white text-center m-3 rounded px-5">
                            Product Added Successfully.....
                        </div>
                    )}
                    
                    {showDeleteMsg && (
                        <div className="alert bg-danger position-fixed start-0 bottom-0 z-3 text-white text-center m-3 rounded px-5">
                            Product Removed Successfully.....
                        </div>
                    )}

                    <h2 className="mt-5 mb-4 fw-bold text-primary">Popular Products</h2>

                    <div className="row g-4">
                        {allProduct.map(function (product) {
                            return (
                                <div key={product._id} className="col-sm-6 col-md-4 col-lg-2">
                                    <div className="card h-100 border-0 shadow-sm overflow-hidden text-dark">
                                        <Link className="text-decoration-none" to={`/ProDetails/${product._id}`}>
                                            <div className="position-relative">
                                                <img
                                                    src={product.imageCover}
                                                    className="card-img-top p-3"
                                                    alt={product.title}
                                                    style={{ height: '220px', objectFit: 'contain' }}
                                                />
                                                {product.priceAfterDiscount && (
                                                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                                        Sale
                                                    </span>
                                                )}
                                            </div>

                                            <div className="card-body d-flex flex-column">
                                                <p className="text-success small mb-1 fw-bold">{product.category?.name}</p>
                                                <h6 className="card-title fw-bold text-truncate" title={product.title}>
                                                    {product.title}
                                                </h6>
                                                <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                                                    <span className="fw-bolder fs-5">
                                                        {product.priceAfterDiscount ? (
                                                            <>
                                                                ${product.priceAfterDiscount} <span className="text-muted text-decoration-line-through fs-6 ms-1">${product.price}</span>
                                                            </>
                                                        ) : (
                                                            `$${product.price}`
                                                        )}
                                                    </span>

                                                    <span className="text-muted small fw-bold">
                                                        <i className="fa-solid fa-star text-warning me-1"></i>
                                                        {product.ratingsAverage}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        {addedProductsIds.includes(product._id) ? (
                                            <button onClick={() => deleteMyProduct(product._id)} className="my-3 btn btn-outline-danger w-100 mt-3">
                                                <i className="fa-solid fa-trash me-2 fs-4"></i>Remove
                                            </button>
                                        ) : (
                                            <button onClick={() => addMyProduct(product._id)} className="my-3 btn btn-outline-success w-100 mt-3">
                                                <i className="fa-solid fa-cart-plus me-2"></i>Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}