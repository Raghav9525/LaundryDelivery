import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Order from './Order'
import BillGenerate from './BillGenerate'
import Delivery from './Delivery'
import Home from './Home'
import PaymentVarify from './PaymentVarify';
import Login from './Login';
import OrderSuccess from './OrderSuccess'
import Error from './Error'
import Admin from './Admin'
import About from './About'
import CustomerPendingPayment from './CustomerPendingPayment'
import Signup from './Signup'
import CustomerPaymentDetail from './CustomerPaymentDetail'
import OrderByVoice from './OrderByVoice'


function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/order' element={<Order />} /> */}
        <Route path='/order' element={<OrderByVoice />} />

        <Route path="/login" element={<Login />} />
        <Route path='/order_success' element={ <OrderSuccess />} />
        <Route path='/error' element={ <Error />} />
        <Route path='/about' element={ <About />} />



        <Route path='/delivery' element={<Delivery />} />
        <Route path='/billgenerate' element={<BillGenerate />} />
        <Route path='/payment_varify' element={<PaymentVarify />} />
        <Route path='/cust_pending_payment' element={<CustomerPendingPayment />} />
        <Route path='/customer_payment_detail' element={<CustomerPaymentDetail />} />

        <Route path='/admin' element={ <Admin />} />
        <Route path='/signup' element={ <Signup />} />


      </Routes>

    </div>
  )
}

export default Dashboard