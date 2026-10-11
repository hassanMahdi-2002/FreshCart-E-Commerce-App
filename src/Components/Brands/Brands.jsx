import axios from "axios";
import { useState, useEffect } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from 'react-router-dom';

export default function Brands() {
    const [allBrands, setAllBrands] = useState(null);

    async function getAllBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
                // console.log(data.data);
                
            
            setAllBrands(data.data);

        } catch (error) {
            console.log("Errors: ", error);
        }
    }
    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            {allBrands ? (
                <div className="container py-5">
                    <div className="row g-4 align-items-center">
                        


                        <div className="col-md-3">
                            <div className="title pe-3">
                                <h2 className="fw-bolder text-primary">Our Brands</h2>
                                <p className="text-muted">Explore the top brands we have in FreshCart just for you.</p>
                            </div>
                        </div>
                        
                        {allBrands.map(function (item) {
                            return (
                                <div key={item._id} className="col-sm-6 col-md-3">
                                    <Link className="text-decoration-none" to={`/brand/${item._id}`}>
                                        <div className="card h-100 shadow-sm border-0 p-4 d-flex justify-content-center align-items-center bg-white rounded-4">
                                           <img src={item.image} className="w-100 mb-3" alt={item.name} style={{ objectFit: 'contain' }} />
                                            <h4 className="fw-bold text-dark mb-0">{item.name}</h4>
                                        </div>
                                    </Link>
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