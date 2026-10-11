
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import errImg from './images/error.jpg'
import ProDetails from './Components/ProDetails/ProDetails';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import Profile from './Components/Profile/profile';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import CartContextProvider from './Context/CartContext';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // Protected Route
  function ProtectedRoute({children}){

    if(currentUser == null){
      return <Navigate to='/Login' />
    }else{
      return<>
        {children}
      </>
    }
  }
  function clearUserData(){
    localStorage.removeItem('userToken') 
    setCurrentUser(null);
  }
  function getUserData(){
    // decode data 
    const userData = jwtDecode(localStorage.getItem('userToken'));
    setCurrentUser(userData)
  }

  useEffect(()=>{

    if(localStorage.getItem('userToken') != null && currentUser == null){
      getUserData();
    }
  },[])

  const route = createBrowserRouter([
    {
      path:'', element: <Layout clearUserData={clearUserData} currentUser={currentUser} /> , children:[
      { path:'/', element: <CartContextProvider> <Home/> </CartContextProvider>  },
      { path:'home', element: <CartContextProvider> <Home/> </CartContextProvider> },
      { path:'prodetails/:id', element: <ProtectedRoute> <CartContextProvider> <ProDetails/> </CartContextProvider>  </ProtectedRoute>  },
      { path:'cart', element: <ProtectedRoute> <CartContextProvider> <Cart/>  </CartContextProvider>  </ProtectedRoute> },
      { path:'payment', element: <ProtectedRoute> <CartContextProvider> <Payment/>  </CartContextProvider>  </ProtectedRoute> },
      { path:'allOrders', element: <ProtectedRoute>  <AllOrders currentUser={currentUser}/> </ProtectedRoute> },
      
      { path:'profile', element:  <ProtectedRoute>  <Profile currentUser={currentUser}/>  </ProtectedRoute> },
      { path:'brand/:id', element:   <ProtectedRoute> <CartContextProvider>  <BrandProducts/>  </CartContextProvider></ProtectedRoute> },
      { path:'login', element: <Login getUserData = {getUserData} />},
      { path:'register', element: <Register/>},
      { path:'brands', element: <Brands/>},
      
        {
          path: '*', 
          element: (
          <div className="container py-5 text-center">
              <img className='w-50' src={errImg} alt="" />
            </div>
          )
        }
      ]}
  ]);

  return<>
    <RouterProvider router = {route} />
  </>
}