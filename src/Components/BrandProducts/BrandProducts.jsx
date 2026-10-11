import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { cartContext } from '../../Context/CartContext';

export default function BrandProducts() {
    const { addProductToCart } = useContext(cartContext);
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    async function getProductsByBrand() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
            
            setProducts(data.data);
            
        } catch (error) {
            console.log("Errors: ", error);
        }
    }

    useEffect(() => {
        getProductsByBrand();
    }, [id]); 

    return (
        <>
            {products ? (
                <div className="container py-5">
                    <h2 className="mb-4 fw-bold text-primary">
                        Brand Products
                    </h2>
                    
                    {products.length === 0 ? (
                        <div className="alert alert-warning text-center">No products found for this brand.</div>
                    ) : (
                        <div className="row g-4">
                            {products.map(function (product) {
                                return (
                                    <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
                                        <Link className="text-decoration-none" to={`/ProDetails/${product._id}`}>
                                            <div className="card h-100 border-0 shadow-sm overflow-hidden">
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
                                                <div className="card-body d-flex flex-column text-dark">
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
                                                    <button 
                                                        onClick={(e) => { 
                                                            e.preventDefault(); 
                                                            addProductToCart(product._id);
                                                            console.log("Added to cart", product._id); 
                                                        }} 
                                                        className="btn btn-outline-success w-100 mt-3"
                                                    >
                                                        <i className="fa-solid fa-cart-plus me-2"></i>Add
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}