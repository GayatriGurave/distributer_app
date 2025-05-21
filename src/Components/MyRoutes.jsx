import React from 'react'
import Appbar from './Appbar'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'
import Carts from './Carts'
import Orders from './Orders'
import Profile from './Profile'
import Login from './Login'
import ProtectedRoute from '../customcontrols/ProtectedRoute'
import OrderDetails from './OrderDetails'
const MyRoutes = () => {
  return (
    <>
      <Appbar />
      <Routes>
         <Route path='/' element={<Products />} />
        <Route path='/product' element={<Products />} />
        <Route path='/cart' element={<Carts />} />
        <Route path='/order' element={<Orders />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path='/login' element={<Login />} />
        <Route path='detail' element={<OrderDetails/>}/>
      </Routes>
    </>
  )
}

export default MyRoutes