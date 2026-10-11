import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {

    const [numOfCartItems , setnumOfCartItems] = useState(0);
    const [totalCartPrice ,settotalCartPrice] = useState(0);
    const [cartProducts,setCartProducts] = useState(null);
    const [cartId , setCartId] =  useState(null)


// add product to cart
    async function addProductToCart(proId) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": proId
            }, {
                headers: { "token": localStorage.getItem("userToken") }
            });
            
            return data; 
            
            
        } catch (error) {
            console.log("Error in Add: ", error);
            return false;
        }
    }

// delete product from cart
    async function deleteProductFromCart(proId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`, {
                headers: { "token": localStorage.getItem("userToken") }
            });
        setCartProducts(data.data.products);
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
            
            return data; 
        } catch (error) {
            console.log("Error in Delete: ", error);
            return false;
        }
    }

// Cart Products 
    async function  getCartProducts () {
        try {
            const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {'token': localStorage.getItem('userToken')}
            })

            if(data.status === "success"){
                setnumOfCartItems(data.numOfCartItems);
                settotalCartPrice(data.data.totalCartPrice);
                setCartProducts(data.data.products);
                setCartId(data.data._id);
            }
            
            // console.log(data.data._id);
            
            
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    // update counter
    async function updataCounter(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
            {
                "count": count
            }, 
            {
                headers: { "token": localStorage.getItem("userToken") }
            });

            
            if (data.status === "success") {
                setCartProducts(data.data.products);
                setnumOfCartItems(data.numOfCartItems);
                settotalCartPrice(data.data.totalCartPrice);
            }
            return data;
            
        } catch (error) {
            console.log("error: ", error);
        }
    }   


    useEffect(()=>{
        getCartProducts();
    } ,[] )

    return (
        <cartContext.Provider value={{ addProductToCart, deleteProductFromCart , numOfCartItems ,totalCartPrice ,cartProducts ,updataCounter , cartId }}>
            {children}
        </cartContext.Provider>
    );
}